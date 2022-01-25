/**
 * function list : CRD 
 */
const express = require("express");
const Article = require("../schemas/article");
const Todos = require("../schemas/todos");
const router = express.Router();

// 0. create - method : post
/* bno, comp_yn, ins_date, use_yn */
router.post("/todos/:bno", async (req, res) => {
    const { bno } = req.params;

    const todos = await Article.find({ bno });
    if (!todos.length) {
        return res.status(400).json({ success: false, errorMessage: "no data to add" });
    }

    const createdTodos = await Todos.create({ 
        bno     : bno, 
        comp_yn : "N",
        ins_date: new Date().toISOString().split('T')[0], 
        use_yn  : "Y" 
    });
    res.json({ todos: createdTodos });
});

// 1. read All 
router.get("/todos", async (req, res) => {
    const todos = await Todos.find();
    res.json({ todos });
});

// 2. delete filtered by bno
router.delete("/todos/:bno", async (req, res) => {
    const { bno } = req.params;
    const isBno = (await Todos.find({ bno }) !== "");
    if (isBno) { await Todos.deleteOne({ bno }); }
    res.json({ result: "success" });
});

module.exports = router;