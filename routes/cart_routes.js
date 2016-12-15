var express = require('express');
var router = express.Router();
var address_dal = require('../model/cart_dal');


// View All cart
router.get('/all', function(req, res) {
    cart_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('cart/cartViewAll', { 'result':result });
        }
    });

});

// View the cart for the given id
router.get('/', function(req, res){
    if(req.query.cart_id == null) {
        res.send('cart_id is null');
    }
    else {
        cart_dal.getById(req.query.cart_id, function(err,result) {
           if (err) {
               res.send(err);
           }
           else {
               res.render('cart/cartViewById', {'result': result});
           }
        });
    }
});

// Return the add a new cart form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    cart_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('cart/cartAdd', {'cart': result});
        }
    });
});

// insert a cart record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.cart_id == null) {
        res.send('Cart must be provided.');
    }
    else if(req.query.bev_id == null) {
        res.send('A Beverage must be selected');
    }
    else if(req.query.num_bev == null) {
        res.send('Number of drinks must be selected');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        cart_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/cart/all');
            }
        });
    }
});


// Delete a cart for the given cart_id
router.get('/delete', function(req, res){
    if(req.query.cart_id == null) {
        res.send('cart_id is null');
    }
    else {
        cart_dal.delete(req.query.cart_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/cart/all');
            }
        });
    }
});



module.exports = router;
