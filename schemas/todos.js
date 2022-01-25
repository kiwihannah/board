const mongoose = require("mongoose");

/* bno, comp_yn, ins_date, use_yn */
const todosSchema = new mongoose.Schema({
    bno: {
        type: Number,
        required: true,
        unique: true
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

module.exports = mongoose.model("todos", todosSchema);