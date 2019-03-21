const express = require('express');
const Users = require('./helpers/userDb');
const router = express.Router();

const nameCapitalization = (req, res, next) => {
    if (req.body.name){
        const { name } = req.body;
        req.body = {"name": name.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')};

        next();
    }

    else next();
}

router.get('/', async (req, res) => {
    try {
        const users = await Users.get(req.query);

        res.status(200).json(users);
    }

    catch (error) {
        console.log(error);

        res.status(500).json({ message: 'Error retrieving the users' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await Users.getById(req.params.id);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }

        else res.status(200).json(user);
    }

    catch (error) {
        console.log(error);

        res.status(500).json({ message: 'Error retrieving the user' });
    }
});

router.post('/', nameCapitalization, async (req, res) => {
    const userDetails = req.body;

    try {
        await Users.insert(userDetails);

        res.status(201).json(userDetails);
    }

    catch (error) {

        if (!userDetails.name){
            res.status(400).json({ errorMessage: "Please provide the name for the user." });
        }

        else{
            console.log(error);
            res.status(500).json({ message: 'Error inserting the user' });
        } 
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const user = await Users.remove(req.params.id);

        if (!user) {
            res.status(404).json({ message: 'The user could not be found' });
        }

        else res.status(204).end();
    }

    catch (error) {
        console.log(error);

        res.status(500).json({ message: 'Error removing the user' });
    }
});

router.put('/:id', nameCapitalization, async (req, res) => {
    const userDetails = req.body;

    try {
        const user = await Users.update(req.params.id, userDetails);

        if (!user) {
            res.status(404).json({ message: 'The user could not be found' });
        }

        else res.status(200).json(userDetails);
    }

    catch (error) {
        if (!userDetails.name){
            res.status(400).json({ errorMessage: "Please provide the new name for the user." });
        }

        else{
            console.log(error);

            res.status(500).json({ message: 'Error updating the user' });
        }
    }
});

router.get('/postsByUser/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const userPosts = await Users.getUserPosts(userId);

        if (userPosts.length === 0) {
            res.status(404).json({ message: 'No posts by this user' });
        }

        else res.status(200).json(userPosts);
    }

    catch (error) {
        console.log(error);

        res.status(500).json({ message: 'Error getting posts by this user' });
    }
});

module.exports = router;