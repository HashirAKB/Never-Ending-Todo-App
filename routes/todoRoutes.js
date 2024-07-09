const { Router } = require("express");
const router = Router();
const { updateTodoFile, getDataFromFile } = require('../components/dataAccess');
const authMiddleware = require('../components/middlewares/authMiddleware');
const logger = require('../components/logger');

const db = require("../db/index");

const userModel = db.User;
const todoModel = db.Todo;


router.get('/', authMiddleware, async (req, res) => {
    try {
        let todos = await todoModel.find({
            user: req.auth.userId,
        });
        logger.info("From getTodos: " + todos);
        res.status(200).json(todos);
    } catch (error) {
        logger.error({
            code: 'TODO_FETCH_FAILED',
            message: `Failed to retrieve todo list`,
            error: error.message
        });
        res.status(500).json({ "error": "Failed to retrieve todo list" });
    }
});

router.get('/:id', authMiddleware, async (req, res) => {
    try{
        let todo = await todoModel.findOne({
            user: req.auth.userId,
            _id: req.params.id,
        });
        if (todo){
            logger.info("Retrieved todo successfully:", todo);
            res.status(200).json(todo);
        }
        else{
            logger.warn("Requested item not found with id: ", req.params.id);
            res.status(404).json({"Error": "Requested Item not found."});
        }
    }
    catch(error){
        logger.error({
            code: 'TODO_ITEM_FETCH_FAILED',
            message: `Failed to retrieve todo list with id: ${req.params.id}`,
            error: error.message
        });
        res.status(500).json({"error": "Failed to retrieve todo item with id:"+req.params.id});
    }
});

router.post('/', authMiddleware, async (req, res) => {
    try{
        const newTodo = new todoModel({
            title: req.body.title,
            description: req.body.description,
            user: req.auth.userId,
        });
        await newTodo.save();

        // Update the User document
        await userModel.findByIdAndUpdate(
            req.auth.userId,
            { $push: { todos: newTodo._id } },
            { new: true }
        );
        logger.info("Added new todo:"+newTodo);
        res.status(201).json(newTodo);
    }
    catch(error){
        logger.error({
            code: 'TODO_ITEM_INSERTION_FAILED',
            message: `Failed to insert new todo to list `,
            error: error
        });
        res.status(500).json({"error": "Failed to insert new todo to list"});  
    }

});

router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const { title, description } = req.body;
        const updateFields = {};

        if (title !== undefined) updateFields.title = title;
        if (description !== undefined) updateFields.description = description;

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ error: "No valid fields to update" });
        }

        const updatedTodo = await todoModel.findOneAndUpdate(
            {
                user: req.auth.userId,
                _id: req.params.id,
            },
            { $set: updateFields },
            { new: true, runValidators: true }
        );

        if (updatedTodo) {
            logger.info("Updated todo successfully:", updatedTodo);
            res.status(200).json(updatedTodo);
        } else {
            logger.warn("Requested item not found or does not belong to user. ID:", req.params.id);
            res.status(404).json({ "error": "Requested item not found or does not belong to user." });
        }
    } catch (error) {
        logger.error("Error updating todo:", error);
        res.status(500).json({ error: "Failed to update todo" });
    }
});

router.delete('/:id', authMiddleware, async (req, res) => {
    try {
            const result = await todoModel.deleteOne({
                user: req.auth.userId,
                _id: req.params.id,
            });
            if (result.deletedCount > 0) {
                logger.info("Deleted todo item with ID:", req.params.id);
                res.status(200).json({ message: "Todo item deleted successfully" });
            } else {
                logger.warn("Todo item not found or does not belong to user. ID:", req.params.id);
                res.status(404).json({ error: "Todo item not found or does not belong to user" });
            }
        } 
    catch (error) {
        logger.error({
            code: 'TODO_ITEM_DELETE_FAILED',
            message: `Failed to delete todo with id: ${req.params.id} `,
            error: error.message
        });
        // logger.error("Failed to delete todo item:", error);
        res.status(500).json({ error: "Failed to delete todo item with id: "+req.params.id});
    }
});

module.exports = router