/* import express */
const express = require('express');
const conn = require("./schemas");
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

/* connecting mongodb */
conn();

/* url logger */
const myLogger = function (req, res, next) {
    console.log(new Date().toLocaleTimeString(), "| Request URL:" , req.originalUrl);
    next();
}

/* enable middleware, static, parsing to json type */ 
app.use(myLogger);
app.use(express.static("static"));
app.use(express.json());
app.use(bodyParser.json());//json타입
app.use(express.urlencoded({extended : false}));

/* sever connecting log */
app.listen(port, () => { console.log(new Date().toLocaleTimeString(), "|", port, ': server connected') });

/* middleware use*/
const articleRouter = require("./routes/article");
const todoRouter = require("./routes/todo");
app.use("/api", [articleRouter, todoRouter]);

/* default */
app.get("/", (req, res) => { res.send("home page"); });