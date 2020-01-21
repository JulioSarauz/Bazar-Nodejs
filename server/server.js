const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('./config/config')
    //Post idonea para crear recursos en el servidor
const mongoose = require('mongoose');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())

app.use(require('./routes/lamina'));


mongoose.connect(process.env.urlDB, { useNewUrlParser: true }, (err, res) => {
    if (err) throw err;
    console.log('Base de datos ONLINE');
});

app.listen(process.env.PORT, () => {
    console.log("Escuchando en el puerto", process.env.PORT);
});