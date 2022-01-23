const express = require('express');
const conn = require("./schemas");
const app = express();
const port = 3000;

/* mongodb conn, json형으로 body 받기 */
conn();
app.use(express.json());

/* 서버 로그 */
app.listen(port, () => {
    console.log(port, ': server connected')
});

/* 미들웨어 위치로 router 선언, 사용하기 */
const articleRouter = require("./routes/article");
app.use("/api", [articleRouter]);

/* url 접근 로그 */
const requestMiddleware = (req, res, next) => {
    console.log("Request URL:" , req.originalUrl, "-", new Date());
    next();
};

/* 'home' 반환 */
app.get('/', (req, res) => {
    res.send('Home');
});

