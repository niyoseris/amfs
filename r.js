var express = require("express");
let haberci = require('rss-parser');
let striptags = require('striptags');


var app = express();
var PORT = process.env.PORT || 8080;


feedz = {
    'Yeni Düzen' : 'http://yeniduzen.com/rss',
    'Güncel Kıbrıs' : 'https://www.guncelkibris.com/rss',
    'Memleket Kıbrıs' : 'https://www.memleketkibris.com/rss',
    'BRTK' : 'http://www.brtk.net/feed/',
    'Detay Kıbrıs' : 'http://www.detaykibris.com/rss',
    'Ve Kıbrıs' : "https://www.vekibris.com/feed/",
    'Halkın Sesi' : 'http://www.halkinsesikibris.com/rss',
    'In-Cyprus' : 'https://in-cyprus.com/feed/',
    'Havadis' : 'http://www.havadiskibris.com/feed/',
    'Ankara Değil Lefkoşa' : 'http://www.ankaradegillefkosa.org/feed/',
    'Diyalog Gazetesi' : 'https://www.diyaloggazetesi.com/rss',
    'Kıbrıs Postası' : 'http://www.kibrispostasi.com/rss.xml?cat=35',
    'Gündem Kıbrıs' : 'https://www.gundemkibris.com/rss',
    'Al Jazeera' : 'http://aljazeera.com.tr/rss.xml',
    'DW Dünya' : 'http://rss.dw.com/rdf/rss-tur-all',
    'Euronews Türkçe' : 'https://feeds.feedburner.com/euronews/tr/home',
    'Euronews' : 'https://feeds.feedburner.com/euronews/en/home',
    'Webtekno' : 'https://feeds.feedburner.com/webteknocom',
    'TechRadar' : 'https://www.techradar.com/nz/rss',
    'Standard Kıbrıs' : 'https://standardkibris.com/rss',
    'Turizm Kıbrıs' : 'https://turizmkibris.com/rss.php',
    'Arkeofili' : 'https://arkeofili.com/feed/rss/',
    'Spor Yeni' : 'http://www.sporyeni.com/rss',
    'Kıbrıs Objektif' : 'https://kibrisobjektif.com/feed',
    'The Magger' : 'https://www.themagger.com/feed/',
    'Sinirbilim' : 'https://sinirbilim.org/rss',
    'Listelist' : 'https://listelist.com/feed/',
    '140journos' : 'https://140journos.com/feed',
    '22dakika' : 'https://22dakika.org/feed',
    '5harfliler' : 'http://5harfliler.com/feed',
    'Hafif Müzik' : 'http://hafifmuzik.org/feed',
    'Sabit Fikir' : 'http://www.sabitfikir.com/rss.xml',
    'Nokta Kibris' : 'http://www.noktakibris.com/rss.xml',
    'Vesaire' : 'https://vesaire.org/rss',
    'Tabella Lise' : 'https://lise.tabella.org/rss',
    'Tabella' : 'https://www.tabella.org/feed',
    'Voice of the Island' : 'https://www.voiceoftheisland.com/feed/',
    'Niyoseris' : 'http://niyoseris.com/feed',
    'Onedio Goygoy' : 'https://onedio.com/support/rss.xml?category=59edf033289af902f042bceb',
    'Onedio Gündem' : 'https://onedio.com/support/rss.xml?category=50187b5d295c043264000144',
    'Onedio Spor' : 'https://onedio.com/support/rss.xml?category=4fa2e79f027fbe9d1c00000d',
    'Onedio Yemek' : 'https://onedio.com/support/rss.xml?category=4fa2e79f027fbe9d1c000023',
    'Onedio Cafe' : 'https://onedio.com/support/rss.xml?category=59edee44289af902f042bce8',
    'Onedio Cool' : 'https://onedio.com/support/rss.xml?category=59edee71289af902f042bce9',
    'Onedio Teknoloji' : 'https://onedio.com/support/rss.xml?category=59edee88289af902f042bcea',
    'Howtogeek' : 'https://feeds.howtogeek.com/howtogeek',
    'Bilimfili' : 'https://bilimfili.com/feed/',
    'Evrim Ağacı' : 'https://evrimagaci.org/rss.xml',
    'Tabella' : 'https://tabella.org/feed',
    'Turluyoruz' : 'https://turluyoruz.wordpress.com/feed/',
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