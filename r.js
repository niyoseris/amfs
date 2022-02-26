var express = require("express");
let haberci = require('rss-parser');
let striptags = require('striptags');


var app = express();
var PORT = process.env.PORT || 8080;


app.get("/", (req, res) => {
    res.header("Content-Type", "text/html; charset=utf-8");
    res.end(don);
})





let h = new haberci();

let don = '';

/*rssList = ["https://www.kibrisgazetesi.com/rss", "https://www.yeniduzen.com/rss", "https://cyprus-mail.com/feed/", "http://www.detaykibris.com/rss"];

rssList =  ["https://www.kibrisgazetesi.com/rss"];
for (r of rssList){
    bak(r);

}

*/

function bak(site){
    (async () => {
        let haber = await h.parseURL("https://www.kibrisgazetesi.com/rss");
        console.log(haber.title);

        haber.items.forEach(item => {
            yeni = "<br><br><br>" + item.title + "<br>" + linkle(item.link) + "<br>" + temizle(item.content) + "<br>";
            don = don + yeni;
        })
    })();
}


function linkle(link){
    return "<a href=\"" + link + "\">" + link + "</a>";
}

function temizle(html){
    return striptags(html,'' , " ").trim();
}


app.listen(PORT, () =>{
    console.log("helüüü " + PORT);
})