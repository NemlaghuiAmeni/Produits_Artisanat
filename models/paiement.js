const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const paiementSchema = new Schema({
    idPaim: String,
    datePaim: String,
   typePaim: String,

  
});

module.exports = mongoose.model('paiement', paiementSchema, 'paiement');