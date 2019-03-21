const express = require('express');
const Posts = require('./helpers/postDb');
const Users = require('./helpers/userDb'); 
const router = express.Router();

// posts

router.get('/posts', async (req, res) => {
    try {
        const posts = await Posts.get(req.query);

        res.status(200).json(posts);
    }

    catch (error) {
        console.log(error);

        res.status(500).json({ message: 'Error retrieving the posts' });
    }
});

router.get('/posts/:id', async (req, res) => {
    try {
        const post = await Posts.getById(req.params.id);

        if (!post) {
            res.status(404).json({ message: 'Post not found' });
        }

        else res.status(200).json(post);
    }

    catch (error) {
        console.log(error);

        res.status(500).json({ message: 'Error retrieving the post' });
    }
});

router.post('/posts', async (req, res) => {
    const postDetails = req.body;

    try {
        await Posts.insert(postDetails);

        res.status(201).json(postDetails);
    }

    catch (error) {
        console.log(error);

        if (!postDetails.text || !postDetails.user_id){
            res.status(400).json({ errorMessage: "Please provide the text and user ID for the post." });
        }

        else res.status(500).json({ message: 'Error inserting the post' });
    }
});

router.delete('/posts/:id', async (req, res) => {
    try {
        const post = await Posts.remove(req.params.id);
        if (!post) {
            res.status(404).json({ message: 'The post could not be found' });
        }

        else res.status(204).end();
    }

    catch (error) {
        console.log(error);

        res.status(500).json({ message: 'Error removing the post' });
    }
});

router.put('/posts/:id', async (req, res) => {
    const postDetails = req.body;

    try {
        const post = await Posts.update(req.params.id, postDetails);

        if (!post) {
            res.status(404).json({ message: 'The post could not be found' });
        }

        else res.status(200).json(postDetails);
    }

    catch (error) {
        console.log(error);

        if (!postDetails.text || !postDetails.user_id){
            res.status(400).json({ errorMessage: "Please provide the text and user ID to change the post." });
        }

        else res.status(500).json({ message: 'Error updating the post' });
    }
});

// users

router.get('/users', async (req, res) => {
    try {
        const users = await Users.get(req.query);

        res.status(200).json(users);
    }

    catch (error) {
        console.log(error);

        res.status(500).json({ message: 'Error retrieving the users' });
    }
});

router.get('/users/:id', async (req, res) => {
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

router.post('/users', async (req, res) => {
    const userDetails = req.body;

    try {
        await Users.insert(userDetails);

        res.status(201).json(userDetails);
    }

    catch (error) {
        console.log(error);

        if (!userDetails.name){
            res.status(400).json({ errorMessage: "Please provide the name for the user." });
        }

        else res.status(500).json({ message: 'Error inserting the user' });
    }
});

router.delete('/users/:id', async (req, res) => {
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

router.put('/users/:id', async (req, res) => {
    const userDetails = req.body;

    try {
        const user = await Users.update(req.params.id, req.body);

        if (!user) {
            res.status(404).json({ message: 'The user could not be found' });
        }

        else res.status(200).json(userDetails);
    }

    catch (error) {
        console.log(error);
        
        if (!userDetails.name){
            res.status(400).json({ errorMessage: "Please provide the new name for the user." });
        }

        else res.status(500).json({ message: 'Error updating the user' });
    }
});

router.get('/users/postsByUser/:userId', async (req, res) => {
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