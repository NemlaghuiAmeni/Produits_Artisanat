var express = require('express');
var router = express.Router();
var lis = require('../models/listcommd');
const http = require('http').createServer(express);
const io = require('socket.io')(http);

var ObjectId = require('mongoose').Types.ObjectId;
var k = 0;

//Liste des commandes
router.get('/list/commd', function(req, res) {
    lis.find({})
        .exec(function(err, listCommd) {
            if (err) {
                console.log("err");
            } else {
                res.json(listCommd);

            }
        });
});

router.route('/:idCmd').get(function(req, res) {
    let idCmd = req.params.idCmd;
    lis.find({ idCmd }, function(err, listCommd) {
        if (err) {
            console.log("err");
        } else {
            res.json(listCommd);
        }
    });
});
router.route('/list/res/:idClient').get(function(req, res) {
    let idClient = req.params.idClient;

    lis.find({ idClient }, function(err, listCommd) {
        if (err) {
            console.log("err");
        } else {
            res.json(listCommd);
        }
    });
});

////////////////////////////

router.route('/list/res/:info').get(function(req, res) {
    let info = req.params.info;

    lis.find({ info}, function(err, listCommd) {
        if (err) {
            console.log("err");
        } else {
            res.json(listCommd);
        }
    });
});
router.post('/saveres', (req, res) => {
    var list = new lis();
    list.idCmd = req.body.idCmd;
    list.idClient = req.body.idClient;
    list.info = req.body.info;
    list.dateCmd = req.body.dateCmd;
    

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