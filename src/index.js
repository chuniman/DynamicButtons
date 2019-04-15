const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors')
const ejs = require('ejs');
const app = express();

// //setear para que puedas usar ejs
// app.set('view engine', 'ejs');

// set the default views folder
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);


app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb://localhost/cameras');

app.use(cors())
routes(app);

app.listen(3000, () => console.log('Servidor corriendo en el puerto 3000!'));