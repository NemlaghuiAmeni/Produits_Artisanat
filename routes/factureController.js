var express = require('express');
var router = express.Router();
var lis = require('../models/facturecommd');
const http = require('http').createServer(express);
const io = require('socket.io')(http);

var ObjectId = require('mongoose').Types.ObjectId;
var k = 0;

//Liste des factures
router.get('/list/fact', function(req, res) {
    lis.find({})
        .exec(function(err, listFact) {
            if (err) {
                console.log("err");
            } else {
                res.json(listFact);

            }
        });
});

router.route('/:idFact').get(function(req, res) {
    let idCmd = req.params.idFact;
    lis.find({ idFact }, function(err, listFact) {
        if (err) {
            console.log("err");
        } else {
            res.json(listFact);
        }
    });
});
router.route('/list/res/:dateFact').get(function(req, res) {
    let dateFact = req.params.dateFact;

    lis.find({ idClient }, function(err, listFact) {
        if (err) {
            console.log("err");
        } else {
            res.json(listFact);
        }
    });
});

router.route('/list/res/:info').get(function(req, res) {
    let info = req.params.info;

    lis.find({ info}, function(err, listFact) {
        if (err) {
            console.log("err");
        } else {
            res.json(listFact);
        }
    });
});
router.post('/saveres', (req, res) => {
    var list = new lis();
    list.idFact = req.body.idFact;
    list.info = req.body.info;
    list.dateFact = req.body.dateFact;
    

    list.save((err, registeredUser) => {
        if (err) {
            console.log(err)
        } else {
            res.json(list)
        }
    })
})

// Supprimer facture
router.delete('/list/d/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    lis.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router