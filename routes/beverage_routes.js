var express = require('express');
var router = express.Router();
var beverage_dal = require('../model/beverage_dal');


// View All beverage
router.get('/all', function(req, res) {
    beverage_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('beverage/beverageViewAll', { 'result':result });
        }
    });

});

// View the beverage for the given id
router.get('/', function(req, res){
    if(req.query.bev_id == null) {
        res.send('bev_id is null');
    }
    else {
        beverage_dal.getById(req.query.bev_id, function(err,result) {
           if (err) {
               res.send(err);
           }
           else {
               res.render('beverage/beverageViewById', {'result': result});
           }
        });
    }
});

// Return the add a new beverage form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    beverage_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('beverage/beverageAdd', {'beverage': result});
        }
    });
});

// insert a beverage record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.name == null) {
        res.send('Name must be provided.');
    }
    else if(req.query.type == null) {
        res.send('Drink Type must be provided');
    }
    else if(req.query.s_type == null) {
        res.send('Specific Type must be selected');
    }
    else if(req.query.ABV == null) {
        res.send('ABV must be provided');
    }
    else if(req.query.price == null) {
        res.send('Price must be provided');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        beverage_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/beverage/all');
            }
        });
    }
});


// Delete a beverage for the given id
router.get('/delete', function(req, res){
    if(req.query.bev_id == null) {
        res.send('bev_id is null');
    }
    else {
        beverage_dal.delete(req.query.bev_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/beverage/all');
            }
        });
    }
});



module.exports = router;
