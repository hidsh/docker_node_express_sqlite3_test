// https://gist.github.com/mitsuruog/fc48397a8e80f051a145
// 
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
});

