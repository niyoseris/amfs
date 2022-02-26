var express = require("express");
let haberci = require('rss-parser');
let striptags = require('striptags');


var app = express();
var PORT = process.env.PORT || 8080;


feedz = {
    "Yeni Düzen": "https://www.yeniduzen.com/rss",
    "Kıbrıs Gazetesi": "https://www.kibrisgazetesi.com/rss",
    "Cyprus-Mail": "https://cyprus-mail.com/rss",
    "Detay Kıbrıs":"http://www.detaykibris.com/rss"
};

let h = new haberci();

for(ll in feedz){
    console.log(ll);
}



function linkle(link){
    return "<a href=\"" + link + "\">" + link + "</a>";
}

function temizle(html){
    return striptags(html,'' , " ").trim();
}

function cevrele(kaynak){
    sonu = "<center><a href=\'" + kaynak + "\'>" + kaynak + "</a></center><br><br>";
    return sonu;
}



app.listen(PORT, () =>{
    console.log("helüüü " + PORT);
})


app.get('/:kim', (req, res) => {
    var kim = feedz[req.params.kim];
    res.header("Content-Type", "text/html; charset=utf-8");
    console.log(kim);

    (async () => {


        don = '';
        try{
        let haber = await h.parseURL(kim);
        console.log(haber.title);

        haber.items.forEach(item => {
            yeni = "<br><br>" +  item.title + "<br>" + linkle(item.link) + "<br>" + temizle(item.content) + "<br>";
            don = don + yeni;
        })

        res.end(don);

    } catch(err){
        console.log(err);
    }


    })();

})

app.get('/', (req, res) => {
    res.header("Content-Type", "text/html; charset=utf-8");
    dur = '';
    for(s in feedz){
        dur = dur + cevrele(s);
    }
    res.end(dur);
})