const { Router } = require("express");
const router = Router();
const {updateUsers, getUsers} = require('../components/user');
const logger = require('../components/logger');
const db = require("../db/index");
const authMiddleware = require('../components/middlewares/authMiddleware');
const userModel = db.User;
const todoModel = db.Todo;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET;


router.post('/signup', async (req, res) => {
    // Implement user signup logic
    /*
    POST /users/signup Description: Creates a new user account. Input: { username: 'user', password: 'pass' } Output: { message: 'User created successfully' }
    */
    try {
        const { username, password } = req.body;

        // Check if user already exists
        const existingUser = await userModel.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new userModel({
            username,
            password: hashedPassword
        });

        await user.save();
        res.status(200).json({ message: 'User created successfully', uid: user._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/signin', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user by username
        const user = await userModel.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Create a JWT token
        const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const userIdFromParams = req.params.id;
        const { username, password } = req.body;

        // Extract the user ID from the JWT token (stored in req.user)
        const userIdFromToken = req.auth.userId;

        // Check if the user ID from the token matches the user ID from the request parameters
        if (userIdFromParams !== userIdFromToken) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

        // Find the user by ID
        const user = await userModel.findById(userIdFromParams);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update username if provided
        if (username) {
            user.username = username;
        }

        // Update password if provided
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        // Save the updated user
        await user.save();

        logger.info("Updated user with id:" + userIdFromParams);
        res.status(200).json({ message: 'User updated successfully', uid: userIdFromParams });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const userIdFromParams = req.params.id;
        const userIdFromToken = req.auth.userId;

        // Check if the user ID from the token matches the user ID from the request parameters
        if (userIdFromParams !== userIdFromToken) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

        // Find the user by ID
        const user = await userModel.findById(userIdFromParams);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Delete all todos associated with the user
        await todoModel.deleteMany({ user: userIdFromParams });

        // Delete the user
        await userModel.findByIdAndDelete(userIdFromParams);

        logger.info("Deleted user with id:" + userIdFromParams);
        res.status(200).json({ message: 'User and associated todos deleted successfully', uid: userIdFromParams });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get('/error', function(req, res) {
    throw new Error("User not found");
});

module.exports = router
