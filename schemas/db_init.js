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