var express = require('express');
var router = express.Router();
var lisP = require('../models/produits');
const multer = require('multer');
var user = require('../models/fournisseur');
var user = require('../models/superAdmin');
var Reservation=require('../models/commande')
var SimpleUser = require('../models/user');
var ObjectId = require('mongoose').Types.ObjectId;
var catégorie= require('../models/catégorie');
const e = require('express');
const catégorie = require('../models/catégorie');
const listCmmd = require('../models/listcommd');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, `FunOfHeuristic_${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})


router.post('/list/listProduitswithId',function(req,res){

    console.log("userIdTofindParking: "+req.body.userId);
    lisP.find({"userId":req.body.userId})
    .populate('commande')
    .exec(function (err, listCommd) {
        if (err) {
            console.log("err");
        } else {
            console.log(listCommd)
            res.json(listCommd);
        }
    });
    
})
router.get('/getProduitsByName',function(req,res){

    lisP.find({ name: req.body.name })
    .populate('produits')
    .exec(function (err, listCommd) {
        if (err) {
            console.log("err");
        } else {
            console.log(listCommd)
            res.json(listCommd);
        }
    });
    
})

router.post('/list/listAdminCommande',function(req,res){
    try {
        console.log(req.body.adminId)
        Reservation.find({})
        .populate('commande')
        .exec(function (err, listCommd) {
            if (err) {
                console.log("err");
            } else {
                console.log(listCommd)
                res.json(listCommd);
            }
        });
        

     
    } catch (err) {
        res.json({message: err.message});

    }

    
})
router.post('/list/listCommande',function(req,res){
    try {
console.log("userId"+req.body.userId)
        Commande.find({"userId":req.body.userId})
        .populate('commande')
        .exec(function (err, listCommd) {
            if (err) {
                console.log("err");
            } else {
                console.log(listCommd)
                res.json(listCommd);
            }
        });
        

     
    } catch (err) {
        res.json({message: err.message});

    }

    
})
router.post('/list/addCatégorie',function(req, res) {
  let commande= new catégorie({
      name:req.body.catégorie,
      attributed:false,
      Commande:false,
      produits:req.body.produits,
	adminId:req.body.adminId,
	rang:req.body.rang

  })
console.log("commande: "+commande)
  commande=commande.save()
  res.json(commande)
  });
  

router.post("/list/update",function(req, res) {
    Catégorie.updateOne({ produits: "chachia" , name:"ChaT2" }, { commande: true }, function(
    err,
    result
  ) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});
router.post('/list/makeCommande',function(req,res){
    try {

      console.log("userId from commande: "+req.body.data.userId)
      console.log("commander produits: "+req.body.data.produits)
    
      let commande = new Commande({

        produits:req.body.data.produits,
        catégorie: req.body.data.catégorie,
        dateCommande: req.body.data.dateC,
        CommandeId:req.body.data.CommandeId,
        InfoC:req.body.data.InfoC,
        Tproduits:req.body.data.Tproduits,
        userId:req.body.data.userId,
        adminId:req.body.data.adminId,
        

    })
    commande =  commande.save();
    Catégorie.updateOne({ produits:req.body.data.produits , name: req.body.data.catégorie }, { Commander: true }, function(
        err,
        result
      ) {
        if (err) {
console.log("eeror saving")
          res.send(err);
        } else {
console.log("success saving")

          res.json(result);
        }
      });
}
        catch (err) {
            res.json({message: err.message});
        }
    })
router.post('/list/ProduitsWithName',function(req,res){
    try {

        catégorie.find({produits:req.body.name,commande:false},function (err, lisP) {
            if(err){
              console.log("err");
            } else{
                
              res.json(lisP);
              console.log(lisP)
            }
          });
        
        console.log('useremail: '+req.body.email)


    } catch (err) {
        res.json({message: err.message});

    }

    
})

router.post('/list/ProduitsWithNameMap',function(req,res){
    try {

        Catégorie.find({produits:req.body.name},function (err, lisP) {
            if(err){
              console.log("err");
            } else{
                
              res.json(lisP);
              console.log(lisP)
            }
          });
        
        console.log('useremail: '+req.body.email)


    } catch (err) {
        res.json({message: err.message});

    }

    
})


router.post('/list/deleteCatégorie',function(req,res){
    try {
console.log("Data to be deleted: "+req.body.catégorie)
	
   let result=  Catégorie.deleteOne({ name: req.body.catégorie,rang:req.body.rang }).then(function(){ 
    console.log("Data deleted"); // Success 
}).catch(function(error){ 
    console.log(error); // Failure 
}); ;

console.log("delete catégorie?")
res.json(result)
    } catch (err) {
        res.json({message: err.message});

    }

    
})


router.post('/list/AllProduits',function(req,res){
    try {

        lisP.find({},function (err, lisP) {
            if(err){
              console.log("err");
            } else{
              res.json(lisP);
              console.log(lisP)
            }
          });
        
        console.log('useremail: '+req.body.email)


    } catch (err) {
        res.json({message: err.message});

    }

    
})
router.post('/list/AllProduits',function(req,res){
    try {

        lisP.find({},function (err, lisP) {
            if(err){
              console.log("err");
            } else{
              res.json(lisP);
              console.log(lisP)
            }
          });
        
        console.log('useremail: '+req.body.email)


    } catch (err) {
        res.json({message: err.message});

    }

    
})

router.post('/list/curentUser',function(req,res){

 
    try { 

        user.find({email:req.body.email},function (err, lisP) {
            if(err){
              console.log("err");
            } else{
              res.json(lisP);
              console.log(lisP)
            }
          });
        
        console.log('useremail: '+req.body.email)


    } catch (err) {
        res.json({message: err.message});

    }

    
})
router.post('/list/curentSimpleUser',function(req,res){

 
    try {

        SimpleUser.find({ email:req.body.email},function (err, lisP) {
            if(err){
              console.log("err");
            } else{
              res.json(lisP);
              console.log(lisP)
            }
          });
        
        console.log('useremail: '+req.body.email)


    } catch (err) {
        res.json({message: err.message});

    }

    
 })

/* ------------------------------------------ traja3lik list ta3 les parking l kol -------------------------*/
router.get('/list/produits', function (req, res) {

    lisP.find({"userId":req.body.userId})
        .populate('commande')
        .exec(function (err, listCommd) {
            if (err) {
                console.log("err");
            } else {
                res.json(listCommd);
            }
        });
});
router.route('/list/produits/:name').get(function (req, res) {
    let name = req.params.name;

    lisP.find({ name }, function (err, listCommd) {
        if (err) {
            console.log("err");
        } else {
            res.json(listCommd);
        }
    });
});

router.post('/addCatégorie', (req, res) => {
    console.log(req)

})

// Add Produits
router.post('/addProduits',(req, res) => {
    var produits = new lisP();
    produits.name = req.body.name;
    produits.ref = req.body.ref;
    produits.libelle = req.body.libelle;
    //produits.pr = req.body.price;
    produits.priceU=req.body.priceU;
    produits.description=req.body.description;
    produits.image = req.body.image;
    produits.userId = req.body.userId;
    console.log(produits.userId)
    produits.save((err, registeredUser) => {
        if (err) {
            console.log('Error in produits save :' +JSON.stringify(err,undefined,2));
        } else {

            res.send(registeredUser)
        }
    })
})

//Supprimer un produits
router.delete('/list/p/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    lisP.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in park Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

//Mettre à jour un produits
router.put('/list/m/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var park = {
        name: req.body.name,
        ref: req.body.ref,
        priceU: req.body.priceU,
        //priceD:req.body.priceD,
        //priceW:req.body.priceW,
        description:req.body.description,
        libelle: req.body.libelle,
        //capteur: req.body.capteur,
        image: req.body.image
    };
    lisP.findByIdAndUpdate(req.params.id, { $set: produits }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in Message Update :' + JSON.stringify(err, undefined, 2)); }
    });
});
/*router.put('/list/m/:name', (req, res) => {


    var park = {
        name: req.body.name,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        price: req.body.price,
        priceD:req.body.priceD,
        priceW:req.body.priceW,
        nbplace: req.body.nbplace,
        capteur: req.body.capteur,
        image: req.body.image
    };
    lisP.findOneAndUpdate({ "name": req.params.name }, { $set: park }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in Park Update :' + JSON.stringify(err, undefined, 2)); }
    });
});*/

module.exports = router;