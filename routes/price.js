var express = require('express');
var router = express.Router();
var price = require('../models/Price');
var lisP = require('../models/Produits');
var lisP = require('../models/Remise');



var ObjectId = require('mongoose').Types.ObjectId;


/*----------------------------------------------------------bch tzid flous--------------------------------------*/

router.post('/addPrice', (req, res) => {
    var list = new price();
    list.valeur = req.body.valeur;
    list.date = req.body.date;
    list.typePr = req.body.typePr;
     list.save((err, registeredUser) => {
       if (err) {
         console.log(err)      
       } else {
       res.json(list)
       }
     })
   })


/*-------------------------------------------------bch tfasa5 flous bil 8alit tzedou-------------------------------------------*/
router.delete('/list/price/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);
  
    price.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2)); }
    });
  }); 


  /* -------------------------------------------- traja3lik list ta3 paiement ------------------------- */
router.get('/list/price', function(req,res)  {
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