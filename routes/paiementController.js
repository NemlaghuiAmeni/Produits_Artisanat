var express = require('express');
var router = express.Router();
var price = require('../models/paiement');
var lisP = require('../models/Commande');
var lisP = require('../models/Facture');



var ObjectId = require('mongoose').Types.ObjectId;


/*----------------------------------------------------------bch tzid flous--------------------------------------*/

router.post('/addPaiement', (req, res) => {
    var list = new paiement();
    list.valeur = req.body.valeur;
    list.date = req.body.date;
    list.typePaim = req.body.typePaim;
     list.save((err, registeredUser) => {
       if (err) {
         console.log(err)      
       } else {
       res.json(list)
       }
     })
   })


/*-------------------------------------------------bch tfasa5 flous bil 8alit tzedou-------------------------------------------*/
router.delete('/list/paiement/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);
  
    price.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2)); }
    });
  }); 


  /* -------------------------------------------- traja3lik list ta3 paiement ------------------------- */
router.get('/list/paiement', function(req,res)  {
    price.find({})
    .exec(function(err, listP){
      if(err){
        console.log("err");
      } else{
        res.json(listP);
      }
    });
});


module.exports = router