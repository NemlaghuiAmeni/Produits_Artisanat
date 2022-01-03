const mongoose = require('mongoose');
const { fileLoader } = require('ejs');


const Schema = mongoose.Schema;


const catégorieSchema = new Schema({
code_cat:String,
attributed:Boolean,
commande:Boolean,
libelle:String,
adminId:String,
fournissurId:String,
rang: {
    type: String,
    unique: true 
   }
    

   

});

module.exports = mongoose.model('catégorie', catégorieSchema, 'catégorie');