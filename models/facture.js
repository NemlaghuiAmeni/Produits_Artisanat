const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const factureSchema = new Schema({
    idFact: String,
    dateFact: String,
    info: String,

  
});

module.exports = mongoose.model('facture', factureSchema, 'facture');