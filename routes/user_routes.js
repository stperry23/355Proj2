var express = require('express');
var router = express.Router();
var user_dal = require('../model/user_dal');
var warehouse_dal = require('../model/warehouse_dal');



// View All user
router.get('/all', function(req, res) {
    user_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('user/userViewAll', { 'result':result });
        }
    });

});

// View the user for the given id
router.get('/', function(req, res){
    if(req.query.user_id == null) {
        res.send('user_id is null');
    }
    else {
        user_dal.getById(req.query.user_id, function(err,result) {
           if (err) {
               res.send(err);
           }
           else {
               res.render('user/userViewById', {'result': result});
           }
        });
    }
});

// Return the add a new user form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    warehouse_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('user/userAdd', {'warehouse': result});
        }
    });
});

// insert a user record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.uname == null) {
        res.send('Name must be provided.');
    }
    else if(req.query.email == null) {
        res.send('A Email must be provided');
    }
    else if(req.query.age == null) {
        res.send('A age must be provided');
    }
    else if(req.query.age < 21) {
            res.send('User must be 21 years of age');
    }
    else if(req.query.street == null) {
        res.send('A street must be provided');
    }
    else if(req.query.zip_u == null) {
        res.send('A Zip Code must be provided');
    }
    else if(req.query.ware_id == null) {
        res.send('A Warehouse must be provided');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        user_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/user/all');
            }
        });
    }
});


// Delete a user for the given user_id
router.get('/delete', function(req, res){
    if(req.query.user_id == null) {
        res.send('user_id is null');
    }
    else {
        user_dal.delete(req.query.user_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/user/all');
            }
        });
    }
});



module.exports = router;
