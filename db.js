// db.js
// https://kuroeveryday.blogspot.com/2016/05/nodejs-sqlite3.html

var sqlite3 = require('sqlite3');
var row;

module.exports.init = function(file) {
    var db = new sqlite3.Database(file);

    db.serialize(function() {
        var create = new Promise(function(resolve, reject) {
            db.get('SELECT COUNT(*) FROM sqlite_master WHERE TYPE="table" AND NAME=$name;', { $name: 'orders' }, function (err, res) {
                var exists = false;
                if (res['COUNT(*)'] > 0) { exists = true; }

                resolve(exists);
            });
        });
        console.log('---1');

        create.then(function(exists) {
            console.log('---2');
            if (!exists) {
                console.log('---3');
                db.run('CREATE TABLE orders (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name TEXT, item TEXT, created_at TIMESTAMP DEFAULT (DATETIME("now","localtime")));' );
                console.log('---4');
            }
        });
    });

    // db.close();

    return db;
};


module.exports.test = function() {
    // https://www.sejuku.net/blog/76485

    return new Promise(function(resolve) {
        resolve(new Date);
    });
};

/* not yet

module.exports.list_all = function(db) {
    var selectedValue = function() {
        return new Promise(function(resolve, reject) {
            // db.serialize(function() {
                db.run('SELECT * FROM orders;', function (err, row) {
                    if(err) return reject(err);
                    
                    resolve(row);
                });
            // });
        });
    };

    var items = selectedValue();
    console.log('---7');
    console.log(items);

    // return selectedValue;
}

*/
