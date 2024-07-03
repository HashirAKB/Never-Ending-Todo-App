const { Router } = require("express");
const router = Router();
const {updateUsers, getUsers} = require('../components/user');
const logger = require('../components/logger');

router.post('/signup', async (req, res) => {
    // Implement user signup logic
    /*
    POST /users/signup Description: Creates a new user account. Input: { username: 'user', password: 'pass' } Output: { message: 'User created successfully' }
    */
    try{
        let newUser = req.body;
        newUser.id = Math.floor(Math.random() * 1000000);
        let userList = await getUsers();
        userList.push(newUser);
        await updateUsers(userList);
        logger.info("Added new user:"+newUser);
        res.status(200).json({ message: 'User created successfully', uid: newUser.id });
    }
    catch(err){
        res.status(500).json({error: err});
    }
});

router.post('/signin', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let userList = await getUsers();
    userList.find(each => each.username === username && each.password === password) ? res.status(200).json({ message: 'User signed in successfully' }) : res.status(500).json({ message: 'User not found'});
});

router.put('/:id', async (req, res) => {
    let userList = await getUsers();
    let index = userList.findIndex(user => user.id == parseInt(req.params.id));
    if(index !== -1){
        userList[index] = {...userList[index], ...req.body};
        await updateUsers(userList);
        logger.info("updated user with id:"+req.params.id);
        res.status(200).json({ message: 'User updated successfully', uid: req.params.id });
    }
    else{
        res.status(404).json({ message: 'User not found' }); 
    }
});

router.delete('/:id', async (req, res) => {
    let userList = await getUsers();
    let index = userList.findIndex(user => user.id == parseInt(req.params.id));
    if(index !== -1){
        userList.splice(index,1);
        await updateUsers(userList);
        logger.info("Deleted user with id:"+req.params.id);
        res.status(200).json({ message: 'User removed successfully', uid: req.params.id });
    }
    else{
        res.status(404).json({ message: 'User not found' }); 
    }
});

router.get('/error', function(req, res) {
    throw new Error("User not found");
});

module.exports = router
