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

router.get('/posts/:id', (req, res) => {
    Posts.getById(req.params.id)
        .then(post => {
            if (!post) {
                res.status(404).json({ message: 'Post not found' });
            }

            else res.status(200).json(post);
        })

        .catch(error => {
            console.log(error);

            res.status(500).json({ message: 'Error retrieving the post' });
        }
    );
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
    try {
        const post = await Posts.insert(req.body);

        res.status(201).json(post);
    }

    catch (error) {
        console.log(error);

        res.status(500).json({ message: 'Error inserting the post' });
    }
});

router.delete('/posts/:id', async (req, res) => {
    try {
        const count = await Posts.remove(req.params.id);
        if (!count) {
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
    try {
        const post = await Posts.update(req.params.id, req.body);

        if (!post) {
            res.status(404).json({ message: 'The post could not be found' });
        }

        else res.status(200).json(post);
    }

    catch (error) {
        console.log(error);

        res.status(500).json({ message: 'Error updating the post' });
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

router.get('/users/:id', (req, res) => {
    Users.getById(req.params.id)
        .then(user => {
            if (!user) {
                res.status(404).json({ message: 'User not found' });
            }

            else res.status(200).json(user);
        })

        .catch(error => {
            console.log(error);

            res.status(500).json({ message: 'Error retrieving the user' });
        }
    );
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
    try {
        const user = await Users.insert(req.body);

        res.status(201).json(user);
    }

    catch (error) {
        console.log(error);

        res.status(500).json({ message: 'Error inserting the user' });
    }
});

router.delete('/users/:id', async (req, res) => {
    try {
        const count = await Users.remove(req.params.id);

        if (!count) {
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
    try {
        const user = await Users.update(req.params.id, req.body);

        if (!user) {
            res.status(404).json({ message: 'The user could not be found' });
        }

        else res.status(200).json(user);
    }

    catch (error) {
        console.log(error);

        res.status(500).json({ message: 'Error updating the user' });
    }
});

router.get('/users/:userId/posts', (req, res) => {
    const { userId } = req.params;
    Users.getUserPosts(userId)
        .then(usersPosts => {
            if (usersPosts === 0) {
                res.status(404).json({ message: 'No posts by this user' });
            }
            else res.status(200).json(usersPosts);
        })
        .catch(error => {
            res.status(500).json({ message: 'Error getting posts by this user' });
        });
});

module.exports = router;