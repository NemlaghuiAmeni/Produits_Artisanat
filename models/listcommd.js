const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listCommdSchema = new Schema({ 
    info: String,
    idCmd: String,
    idClient: String,
    dateCmd : String,
    catégorie: String,
    
});


module.exports = mongoose.model('listCommd', listCommdSchema, 'listCommande');