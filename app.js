// https://gist.github.com/mitsuruog/fc48397a8e80f051a145
// 

// sqlite3 test
var sqlite = require('./db.js');
var db = new sqlite.init('./test.db');

var express = require('express');
var app = express();

// HTTPリクエストを受け取る部分
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
    console.log('---x');
    // res.send('promise test');
});

app.get('/list', function(req, res) {
    s = '<table border="1" cellspacing="0" cellpadding="5">';
    sqlite.list_all().then(function(rows) {
        console.log(rows);

        rows.forEach(function(r) {
            s += '<tr><td>' + r.id + '</td><td>' + r.name + '</td><td>' + r.item + '</td><td>' + r.created_at + '</td></tr>';
        });
        res.send(s + '</table>');
    });

    console.log('---y');

});


/*
app.get('/insert', function(req, res) {
    db.serialize(function(){

        console.log('---5\n');
        
        // プリペアードステートメントでINSERT
        var stmt = db.prepare('INSERT INTO orders (name, item) VALUES(?,?);');
        stmt.run(["ホゲオ", "松"]);
        stmt.finalize();

        // SELECT
        db.serialize(function() {
            db.each("SELECT * FROM orders;", function(err, row) {
                console.log(row);
            });
        });
    });

    db.close();

    if 
    res.send('id:$id  name:$name item:$item created_at:$datetime</br>',
             {$id: row.id, $name: row.name, $item: row.item, $datetime: row.created_at});
});
*/

// サーバーを起動する部分
var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://localhost:8080 in docker container');



});

