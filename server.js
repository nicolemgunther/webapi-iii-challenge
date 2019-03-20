const express = require("express");
const helmet = require("helmet");
const dataRouter = require("./data/dataRouter");
const server = express();

function teamNamer(req, res, next) {
    req.team = "Web XVII";
    next();
}

server.use(express.json());
server.use(helmet());
server.use(teamNamer);
server.use("/api", dataRouter);

server.get("/", (req, res) => {
    res.send(`
        <h2>Lambda Posts API</h2>

        <p>Welcome ${req.team} to the Lambda Posts API</p>
        `);
});

module.exports = server;