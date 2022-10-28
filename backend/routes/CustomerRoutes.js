//record.js
//const { response } = require('express');
const express = require('express');

const CustomerRoutesVar = express.Router(); //recordRoutes

const dbo = require('../db/conn');

const ObjectId = require('mongodb').ObjectId;

//getting list of all records
CustomerRoutesVar.route('/CustomerRoutes').get(function(req,res){
    let db_connect = dbo.getDb("CafeAppDB");
    db_connect
    .collection("Customer")  //records
    .find({})
    .toArray(function(err, result){
        if(err) throw err;
        res.json(result);
    });
});

//getting single record by id
CustomerRoutesVar.route('/CustomerRoutes/:id').get(function(req,res) {
    let db_connect = dbo.getDb();
    let myquery = {_id: ObjectId(req.params.id)};
    db_connect
        .collection('Customer')
        .findOne(myquery, function(err, result) {
            if(err) throw err;
            res.json(result);
        });
});

//creating a new record
CustomerRoutesVar.route('/CustomerRoutes/add').post(function(req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
        name: req.body.name,
        number: req.body.number,
        level: req.body.level,
    };
    db_connect.collection("Customer").insertOne(myobj, function(err, res) {
        if (err) throw err;
        response.json(res);
    });
});

//updating a rec by id
CustomerRoutesVar.route('/update/:id').post(function(req,response) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id)};
    let newValues = {
        $set: {
            name: req.body.name,
            number: req.body.number,
            level: req.body.level,
        },
    };
    db_connect
        .collection("Customer")
        .updateOne(myquery, newValues, function(err,res) {
            if(err) throw err;
            console.log("1 document updated");
            response.json(res);
        });
});

//deleting a record

CustomerRoutesVar.route('/:id').delete((req,response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id)};
    db_connect.collection("Customer").deleteOne(myquery, function(err,obj) {
        if (err) throw err;
        console.log("1 document deleted");
        response.json(obj);
    });
});

    module.exports = CustomerRoutesVar;