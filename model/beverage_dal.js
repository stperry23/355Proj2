var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM beverage;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(beverage_id, callback) {
    var query = 'SELECT * FROM beverage WHERE beverage_id = ?';
    var queryData = [beverage_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};


exports.insert = function(params, callback) {
    var query = 'INSERT INTO beverage (bev_id, name, type, s_type, ABV, price) VALUES (?, ?, ?, ?, ?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.bev_id, params.name, params.type, params.s_type, params.ABV, params.price];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.delete = function(beverage_id, callback) {
    var query = 'DELETE FROM beverage WHERE bev_id = ?';
    var queryData = [beverage_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};