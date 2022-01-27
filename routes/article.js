/**
 * function list : CRUD + filter
 */
const express = require("express");
const Article = require("../schemas/article");
const router = express.Router();

// 0. create - method : post
/* bno, level, writer, title, context, comp_yn, ins_date, upd_date, use_yn */
router.post("/articles", async (req, res) => {
  const { level_give, writer_give, title_give, url_give } = req.body;
  console.log(level_give, writer_give, title_give, url_give);
  const article = await Article.find().sort({ bno: -1 });
  const createdArticle = await Article.create({
    bno: article[0]["bno"] + 1,
    level: level_give,
    writer: writer_give,
    title: title_give,
    url: url_give,
    comp_yn: "N",
    ins_date: new Date().toISOString().split("T")[0],
    upd_date: new Date().toISOString().split("T")[0],
    goal_yn: "N",
  });
  console.log("[Router : POST]", article[0]["bno"] + 1);
  res.json({ article: createdArticle });
});

// 1_1. read All
router.get("/articles", async function (req, res) {
  let page = Math.max(1, parseInt(req.query.page)); // string -> int
  let limit = 7;
  page = !isNaN(page) ? page : 1;
  let skip = (page - 1) * limit;
  let count = await Article.countDocuments({});
  let maxPage = Math.ceil(count / limit);
  const articles = await Article.find({})
    .sort({ bno: -1 })
    .skip(skip)
    .limit(limit)
    .exec();
  res.json({ articles: articles, currentPage: page, maxPage: maxPage });
});

// 1_2. read One filtered by bno
router.get("/article/:bno", async (req, res) => {
  const { bno } = req.params;
  const article = await Article.findOne({ bno });
  if (!article) {
    return res
      .status(400)
      .json({ success: false, errorMessage: "Cannot read an empty article" });
  }
  console.log("[Router : READ ONE]", article["bno"]);
  res.json({ article });
});

// 1_3. read Many filtered by level, order, comp_yn
router.get("/filter", async (req, res) => {
  const { level, comp_yn, ins_date } = req.query;
  let page = Math.max(1, parseInt(req.query.page)); // string -> int
  let query = "";
  let limit = 7;
  Number(level) === 0 ? (query = {}) : (query = { level: level });
  console.log(query, comp_yn, ins_date);
  page = !isNaN(page) ? page : 1;
  let skip = (page - 1) * limit;
  let count = await Article.countDocuments({});
  let maxPage = Math.ceil(count / limit);
  const filtered = await Article.find({ $and: [query, { comp_yn: comp_yn }] })
    .sort({ ins_date: ins_date })
    .skip(skip)
    .limit(limit)
    .exec();
  res.json({ filtered: filtered, currentPage: page, maxPage: maxPage });
});

// 3. update filtered by bno - method: put
/* bno, level, writer, title, context, comp_yn, ins_date, upd_date, use_yn */
router.put("/articles/:bno", async (req, res) => {
  const { bno } = req.params;
  const { level_give, title_give, url_give, comp_yn_give } = req.body;
  const article = await Article.findOne({ bno });
  await Article.updateOne(
    { bno: bno },
    {
      $set: {
        level: level_give,
        title: title_give,
        url: url_give,
        comp_yn: comp_yn_give,
        upd_date: new Date().toISOString().split("T")[0],
      },
    }
  );
  console.log("[Router : MODIFY ONE]", article["bno"]);
  res.json({ result: "success" });
});

// 2_2. put make it comp
router.put("/make-it-comp/:bno", async (req, res) => {
  const { bno } = req.params;
  const article = await Article.findOne({ bno });
  await Article.updateOne(
    { bno: bno },
    {
      $set: {
        comp_yn: "Y",
        upd_date: new Date().toISOString().split("T")[0],
      },
    }
  );
  console.log("[Router : COMP ONE]", article["bno"]);
  res.json({ result: "success" });
});

// 3. delete filtered by bno
router.delete("/articles/:bno", async (req, res) => {
  const { bno } = req.params;
  const isBno = (await Article.find({ bno })) !== "";
  if (isBno) {
    await Article.deleteOne({ bno });
  }
  res.json({ result: "success" });
});

module.exports = router;
