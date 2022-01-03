const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const priceSchema = new Schema({
    idPar: String,
    valeur: String,
   datePar: String,

  
});

module.exports = mongoose.model('price', priceSchema, 'price');