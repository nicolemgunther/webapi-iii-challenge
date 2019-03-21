const express = require("express");
const helmet = require("helmet");
const postRouter = require("./data/postRouter");
const userRouter = require("./data/userRouter");
const server = express();

function teamNamer(req, res, next) {
    req.team = "Web XVII";
    next();
}

server.use(express.json());
server.use(helmet());
server.use(teamNamer);
server.use("/api/posts", postRouter);
server.use("/api/users", userRouter);

server.get("/", (req, res) => {
    res.send(`
        <h2>Hi. You're at the wrong site! Visit /api/users or /api/posts to view the respective JSON objects.</h2>
        `);
});

module.exports = server;