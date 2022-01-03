const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const remiseSchema = new Schema({
    idRem: String,
    refProd: String,
    idCmd: String,

  
});

module.exports = mongoose.model('remise', remiseSchema, 'remise');