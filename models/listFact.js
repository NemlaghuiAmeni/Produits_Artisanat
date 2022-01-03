const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listFactSchema = new Schema({ 
    info: String,
    idFact: String,
    Userid: String,
    dateFact : String,
    
    
});


module.exports = mongoose.model('listFact', listFactSchema, 'listFact');