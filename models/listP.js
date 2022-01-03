const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listPSchema = new Schema({ 
    info: String,
    idP: String,
    refProd: String,
    userId: String,
    dateP : String,
    catégorie: String,
    
});


module.exports = mongoose.model('listP', listPSchema, 'listP');