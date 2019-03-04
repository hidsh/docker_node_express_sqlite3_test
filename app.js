// https://gist.github.com/mitsuruog/fc48397a8e80f051a145
// 

// sqlite3 test
var sqlite = require('sqlite3').verbose();
var db = new sqlite.Database('test.db');

var express = require('express');
var app = express();

// HTTPリクエストを受け取る部分
app.get('/', function (req, res) {
  res.send('Hello World!');
});

// サーバーを起動する部分
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://localhost:8080 in docker container');

    db.serialize(function() {

        // テーブルがなければ作成
        // db.run('CREATE TABLE IF NOT EXISTS students(name TEXT, age INT)');
        
        // プリペアードステートメントでINSERT
        var stmt = db.prepare('INSERT INTO orders (name, item) VALUES(?,?)');
        stmt.run(["ホゲオ", "松"]);
        stmt.finalize();

        // SELECT
        db.serialize(function() {
            db.each("SELECT * FROM orders", function(err, row) {
                console.log(row);
            });
        });
    });

    db.close();

});

