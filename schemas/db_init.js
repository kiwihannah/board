const mongoose = require("mongoose");

const axios = require("axios");
const iconv = require("iconv-lite");
const cheerio = require("cheerio");

axios({
    url: "http://www.yes24.com/24/Category/BestSeller",
    method: "GET",
    responseType: "arraybuffer",
})
    .then((response) => {
        const content = iconv.decode(response.data, "EUC-KR").toString();

        const $ = cheerio.load(content);
        const bestList = $("#bestList > ol > li");
        bestList.each((index, element) => {
            const title = $(element).find("p:nth-child(3) > a").text();
            const desc = $(element).find("p.copy > a").text();
            const image = $(element).find("p.image > a > img").attr("src");
            const price = $(element).find("p.price > strong").text();
        });
    })
    .catch((error) => {
        console.log(error);
    });
    
module.exports = mongoose.model("exam", cartSchema);

const db = mongoose.connection;
db.once("open", async () => {
  if ((await User.countDocuments().exec()) > 0) return;
  Promise.all([
    User.create({ _id: 1, name: "User 1" }),
    User.create({ _id: 2, name: "User 2" }),
    User.create({ _id: 3, name: "User 3" }),
    User.create({ _id: 4, name: "User 4" }),
    User.create({ _id: 5, name: "User 5" }),
    User.create({ _id: 6, name: "User 6" }),
    User.create({ _id: 7, name: "User 7" }),
    User.create({ _id: 8, name: "User 8" }),
    User.create({ _id: 9, name: "User 9" }),
    User.create({ _id: 10, name: "User 10" }),
    User.create({ _id: 11, name: "User 11" }),
    User.create({ _id: 12, name: "User 12" }),
  ]).then(() => console.log("Added All Users"));
});