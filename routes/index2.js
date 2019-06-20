let express = require('express');
let router = express.Router();
let ioIndex;
let timeServer;
let myTime;
let difference;
let average;
router.get('/', function(req, res) {
  res.render('index2');
});


router.post('/time', (req, res) => {
    timeServer = req.body.timeServer;
    console.log("Llego del servidor: ", timeServer);
    myTime = Date.now();
    console.log("La hora que tengo en este servidor: ", myTime);
    difference = myTime - timeServer;
    console.log("Diferencia entre tiempos ", difference);
    res.json({
        difference, myTime
    });
});

router.post('/average', (req, res) =>{
    average = req.body.average;
    console.log("El promedio de los tiempos es ", average);
    ioIndex.emit('print', { timeServer, myTime, difference, average});
    if(myTime > average){
        res.json({ adjustment : (myTime - average), 
                    message : "Se atrasa"});
    }else{
        res.json({ adjustment : (average - myTime),
                    message : "Se adelanta"});
    }
    
});

module.exports = function(io) {
    ioIndex = io;
    io.on('connection', (socket) =>{
        console.log("Nueva conexión ", socket.handshake.address);
    });
    return router;
}