// https://gist.github.com/mitsuruog/fc48397a8e80f051a145
// 

// sqlite3 test
var sqlite = require('./db.js');
var db = new sqlite.init('./test.db');

var express = require('express');
var app = express();

/*
var u="ソニックブーム", num=8;
console.log(`一句：待ちガイル ${u} ${num}連発！`)
*/


//
// HTTPリクエストのハンドラ
//
app.get('/', function (req, res) {
    res.send('Hello node - express !');
});

// Promise test
app.get('/test', function(req, res) {
    sqlite.test().then(function(data) {
        return data.getFullYear().toString(10);
    }).then(function(data) {
        // console.log(data);
        res.send('<h1>' + data + '年</h1>');
    });
    console.log('--- test end');
    // res.send('promise test');
});

// sqlite test: select
app.get('/list', function(req, res) {
    s = '<table border="1" cellspacing="0" cellpadding="5">';
    sqlite.list_all().then(function(rows) {
        console.log(rows);

        rows.forEach(function(r) {
            s += '<tr><td>' + r.id + '</td><td>' + r.name + '</td><td>' + r.item + '</td><td>' + r.created_at + '</td></tr>';
        });
        res.send(s + '</table>');
    });

    console.log('--- list end');
});


// sqlite test: insert
app.get('/insert', function(req, res) {
    let name = 'ホゲオ', item = '松';
    
    sqlite.insert(name, item).then(function() {
        res.send(`${name}さまから「${item}」のご注文を承りました。</br>`);
    });
    console.log('---insert end');
});

// sqlite test: delete
app.get('/delete', function(req, res) {
    let name = 'ホゲオ';
    
    sqlite.delete(name).then(function() {
        res.send(`${name}さまからのご注文をキャンセルしました。</br>`);
    });
    console.log('---delete end');
});


//
// サーバーを起動
//
var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Listening at http://localhost:8080 in docker container');
});

