/**
 * function list : CRUD + filter 
 */
const express = require("express");
const Article = require("../schemas/article");
const router = express.Router();

// 0. create - method : post
/* bno, level, writer, title, context, comp_yn, ins_date, upd_date, use_yn */
router.post("/articles", async (req, res) => {
    const { bno, level, writer, title, context } = req.body;

    const article = await Article.find({ bno });
    if (article.length) {
        return res.status(400).json({ success: false, errorMessage: "we already have this test!" });
    }

    const createdArticle = await Article.create({ 
        bno     : bno, 
        level   : level,
        writer  : writer, 
        title   : title, 
        context : context, 
        comp_yn : "Y",
        ins_date: new Date().toISOString().split('T')[0], 
        upd_date: "", 
        use_yn  : "Y" 
    });
    res.json({ article: createdArticle });
});

// 1_1. read All 
router.get("/articles", async (req, res) => {
    const articels = await Article.find();
    res.json({ articels });
});

// 1_2. read One filtered by bno
router.get("/articles/:bno", async (req, res) => {
    const { bno } = req.params;
    const article = await Article.findOne({ bno });
    if(!article) {
        return res.status(400).json({ success: false, errorMessage: "Cannot read an empty article" });
    }
    res.json({ article });
});

// 1_3. read Many filtered by level
router.get("/articles/level/:level", async (req, res) => {
    const { level } = req.params;
    const article = await Article.find({ level });
    if(!article) {
        return res.status(400).json({ success: false, errorMessage: "Cannot read an this level of article" });
    }
    res.json({ article });
});

// 3. update filtered by bno - method: put
/* bno, level, writer, title, context, comp_yn, ins_date, upd_date, use_yn */
router.put("/articles/:bno", async (req, res) => {
    const { bno } = req.params;
    const { level, writer, title, context, comp_yn } = req.body;
    const existsArticle = await Article.find({ bno: Number(bno) });
    if (existsArticle.length) {
        await Article.updateOne({ bno: Number(bno) }, 
        { $set: {
                    level   : level,
                    writer  : writer,
                    title   : title,
                    context : context,
                    comp_yn : comp_yn,
                    upd_date: new Date().toISOString().split('T')[0] 
                } 
        });
    } else {
        return res.status(400).json({ success: false, errorMessage: "Cannot be updated an empty article" });
    }
    res.json({ result: "success" });
});

// 3. delete filtered by bno
router.delete("/articles/:bno", async (req, res) => {
    const { bno } = req.params;
    const isBno = (await Article.find({ bno }) !== "");
    if (isBno) { await Article.deleteOne({ bno }); }
    res.json({ result: "success" });
});

module.exports = router;