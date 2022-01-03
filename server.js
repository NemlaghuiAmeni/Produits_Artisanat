const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path');
const http = require('http').createServer(express);
const io = require('socket.io')(http);

// Defining the PORT
const port = 3006;

// Initialize the app
const app = express();


// Mongodb Config
const { mongoose } = require('./db.js');



const admin = require('./routes/adminController');
const fournisseur = require('./routes/fournisseurController');
const paypal = require('./routes/paypal');
const produitsController = require('./routes/produitsController.js');
const commandeController = require('./routes/commandeController');
const user = require('./routes/userController');
const superAdmin = require('./routes/superAdmin');
const factureController = require('./routes/factureController');
const paiementController = require('./routes/paiementController');
const priceController = require('./routes/priceController');
const catégorieController = require('./routes/catégorieController');
const sendEmail = require('./routes/sendEmail');
const remiseController = require('./routes/remiseController');
const producerController = require('./routes/kafkaController/producerController');
const consumerController = require('./routes/kafkaController/consumerController');
const chatServer = require('./routes/chatController/chatServer');
var listCommd = require('./models/listCommd');
var listFact = require('./models/listFact');
var listP = require('./models/listP');
const fcatégorie = require('./models/catégorie.js');

// Defining the Middlewares
//app.use(cors())
    // Set the static folder
app.use(express.static(path.join(__dirname, 'dist')));
// BodyParser Middleware


app.use('/uploads', express.static('uploads'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', admin);
app.use('/api', fournisseur);
app.use('/api', superAdmin);
app.use('', paypal);
app.use('/api', produitsController);
app.use('/api', commandeController);
app.use('/api', catégorieController);
app.use('/api', remise);
app.use('/api', listCommd);
app.use('/api', listFact);
app.use('/api', listP); 
app.use('/api', priceController);
app.use('/api', sendEmail);
app.use('/api', paiementController);
app.use('/api', factureController);
app.use('', chatServer);
app.use(cors({origin:'http://localhost:4200'}));
app.all("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
  });

app.get("/", function(req, res) {
    res.send(`<h2>hello 3of</h2>`);
})


//app.listen(3006, '51.210.182.172');
app.listen(3006);

app.listen(port, function() {
    console.log("Server running on localhost:" + port);

});