const mongoose = require("mongoose");

/* bno, level, writer, title, context, comp_yn, ins_date, upd_date, use_yn */
const articleSchema = new mongoose.Schema({
    bno: {
        type: Number,
        required: true,
        unique: true
    },
    level: {
        type: Number,
        required: true,
        unique: false
    },
    writer: {
        type: String,
        required: true,
        unique: false
    },
    title: {
        type: String,
        required: true,
        unique: false
    },
    url: {
        type: String,
        required: true,
        unique: false
    },
    comp_yn: {
        type: String,
        required: true,
        unique: false
    },
    ins_date: {
        type: String,
        required: true,
        unique: false
    },
    upd_date: {
        type: String,
        unique: false
    },
    goal_yn: {
        type: String,
        required: true,
        unique: false
    }
});

module.exports = mongoose.model("Article", articleSchema);