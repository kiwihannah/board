/* import express */
const express = require('express');
const conn = require("./schemas");
const app = express();
const port = 3000;

/* connecting mongodb */
conn();

/* variate middleware */
const requestMiddleware = (req, res, next) => {
    console.log("Request URL:" , req.originalUrl, "-", new Date());
    next();
};

/* enable middleware, static folder, parsing to json type */ 
app.use(requestMiddleware);
app.use(express.static("static"));
app.use(express.json());

/* sever connecting log */
app.listen(port, () => {
    console.log(port, ': server connected')
});

/* articel middleware use*/
const articleRouter = require("./routes/article");
app.use("/api", [articleRouter]);

/* default */
app.get("/", (req, res) => {
    res.send("home page");
});

