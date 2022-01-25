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
    writer: { //mem_code
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
    use_yn: {
        type: String,
        required: true,
        unique: false
    }
});

module.exports = mongoose.model("Article", articleSchema);