const express = require("express");
const helmet = require("helmet");
const postRouter = require("./data/postRouter");
const userRouter = require("./data/userRouter");
const server = express();

server.use(express.json());
server.use(helmet());
server.use("/api/posts", postRouter);
server.use("/api/users", userRouter);

server.get("/", (req, res) => {
    res.send(`
        <h2>Hi. You're at the wrong site! Please visit /api/users or /api/posts to view the respective JSON objects.</h2>
        `);
});

module.exports = server;