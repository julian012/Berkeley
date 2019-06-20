const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const server = require('http').createServer(app);
const io = require('socket.io') (server);

var indexRouter = require('./routes/index2')(io);

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

server.listen(3200, () => { console.log("Servidor se escucha en el puerto 3200")});

app.use('/', indexRouter);


