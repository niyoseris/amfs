let haberci = require('rss-parser');

let striptags = require('striptags');

let h = new haberci();

rssList = ["https://www.kibrisgazetesi.com/rss", "https://www.yeniduzen.com/rss", "https://cyprus-mail.com/feed/", "http://www.detaykibris.com/rss"];

for (r of rssList){
    bak(r);
}

function bak(site){
    (async () => {
        let haber = await h.parseURL( r );
        console.log(haber.title);

        haber.items.forEach(item => {
            console.log(item.title + "\n" + item.link + "\n" + temizle(item.content) + "\n");
        })
    })();
}


function linkle(link){
    return "<a href=\"" + link + "\"></a>";
}

function temizle(html){
    return striptags(html,'' , " ").trim();
}