var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM user;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(user_id, callback) {
    var query = 'SELECT * FROM user WHERE user_id = ?';
    var queryData = [user_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};


exports.insert = function(params, callback) {
    var query = 'INSERT INTO user (user_id, uname, email, age, street, zip_u, ware_id) VALUES (?, ?, ?, ?, ?, ?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.user_id, params.uname, params.email, params.age, params.street, params.zip_u, params.ware_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.delete = function(user_id, callback) {
    var query = 'DELETE FROM user WHERE user_id = ?';
    var queryData = [user_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};