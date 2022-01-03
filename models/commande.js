const mongoose = require('mongoose');
const { fileLoader } = require('ejs');


const Schema = mongoose.Schema;


const commandeSchema = new Schema({
    produit: String,
    catégorie: String,
    idCmd:String,
    dateCmd:String,
    info:String,
    userId:String,
    adminId:String,
    

   

});

module.exports = mongoose.model('commande', commandeSchema, 'commande');