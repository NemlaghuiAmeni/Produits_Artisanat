var express = require('express');
var router = express.Router();
var lis = require('../models/catégorie');
const http = require('http').createServer(express);
const io = require('socket.io')(http);

var ObjectId = require('mongoose').Types.ObjectId;
var k = 0;

//Liste des commandes
router.get('/list/cat', function(req, res) {
    lis.find({})
        .exec(function(err, listCat) {
            if (err) {
                console.log("err");
            } else {
                res.json(listCat);

            }
        });
});

router.route('/:code_cat').get(function(req, res) {
    let code_cat = req.params.code_cat;
    lis.find({ code_cat }, function(err, listCat) {
        if (err) {
            console.log("err");
        } else {
            res.json(listCat);
        }
    });
});

router.route('/list/res/:libelle').get(function(req, res) {
    let libelle = req.params.libelle;

    lis.find({ libelle }, function(err, listCat) {
        if (err) {
            console.log("err");
        } else {
            res.json(listCat);
        }
    });
});



router.post('/saveres', (req, res) => {
    var list = new lis();
    list.code_cat = req.body.code_cat;
    list.libelle = req.body.libelle;
    

    list.save((err, registeredUser) => {
        if (err) {
            console.log(err)
        } else {
            res.json(list)
        }
    })
})

// Supprimer Commande
router.delete('/list/d/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    lis.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router