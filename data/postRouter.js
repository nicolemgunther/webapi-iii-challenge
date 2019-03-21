const express = require('express');
const Posts = require('./helpers/postDb');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await Posts.get(req.query);

        res.status(200).json(posts);
    }

    catch (error) {
        console.log(error);

        res.status(500).json({ message: 'Error retrieving the posts' });
    }
});

router.get('/:id', async (req, res) => {
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

router.post('/', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
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

router.put('/:id', async (req, res) => {
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

module.exports = router;