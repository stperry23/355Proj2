var express = require('express');
var router = express.Router();
var warehouse_dal = require('../model/warehouse_dal');


// View All warehouse
router.get('/all', function(req, res) {
    warehouse_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('warehouse/warehouseViewAll', { 'result':result });
        }
    });

});

// View the warehouse for the given id
router.get('/', function(req, res){
    if(req.query.ware_id == null) {
        res.send('ware_id is null');
    }
    else {
        warehouse_dal.getById(req.query.ware_id, function(err,result) {
           if (err) {
               res.send(err);
           }
           else {
               res.render('warehouse/warehouseViewById', {'result': result});
           }
        });
    }
});

// Return the add a new warehouse form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    warehouse_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('warehouse/warehouseAdd', {'warehouse': result});
        }
    });
});

// insert a warehouse record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.zip_w == null) {
        res.send('Zip Code must be provided.');
    }
    else if(req.query.name_w == null) {
        res.send('A Warehouse Name must be selected');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        warehouse_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/warehouse/all');
            }
        });
    }
});


// Delete a warehouse for the given id
router.get('/delete', function(req, res){
    if(req.query.ware_id == null) {
        res.send('ware_id is null');
    }
    else {
        warehouse_dal.delete(req.query.ware_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/warehouse/all');
            }
        });
    }
});



module.exports = router;
