var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM warehouse;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(ware_id, callback) {
    var query = 'SELECT * FROM warehouse WHERE ware_id = ?';
    var queryData = [ware_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};


exports.insert = function(params, callback) {
    var query = 'INSERT INTO warehouse (ware_id, zip_w, name_w) VALUES (?, ?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.ware_id, params.zip_w, params.name_w];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.delete = function(ware_id, callback) {
    var query = 'DELETE FROM warehouse WHERE ware_id = ?';
    var queryData = [ware_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};