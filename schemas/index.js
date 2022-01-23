const mongoose = require("mongoose");
const conn = () => {
    mongoose.connect("mongodb://localhost:27017/board", {ignoreUndefined: true}).catch((err) => {
        console.log(err);
    });
};

module.exports = conn;