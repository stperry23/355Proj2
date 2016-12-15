var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM cart;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(account_id, callback) {
    var query = 'SELECT * FROM cart WHERE cart_id = ?';
    var queryData = [cart_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};


exports.insert = function(params, callback) {
    var query = 'INSERT INTO cart (order_id, bev_id, num_bev) VALUES (?, ?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.order_id, params.bev_id, params.num_bev];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.delete = function(cart_id, callback) {
    var query = 'DELETE FROM cart WHERE cart_id = ?';
    var queryData = [cart_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};