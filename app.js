const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
var indexRouter = require('./routes/index');

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3200, () => { console.log("Servidor se escucha en el puerto 3200")});

app.use('/', indexRouter);


