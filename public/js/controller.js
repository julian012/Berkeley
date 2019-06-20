angular.module('prueba', [])
    .controller('Controller', ['$http', ($http) => {
      let ctrl = this;
      let socket = io();
      let loggers = [];
      let info = [];

      socket.on( 'print', (message) => {
          ctrl.timeServer = message.timeServer;
          ctrl.myTime = message.myTime;
          ctrl.difference = message.difference;
          ctrl.average = message.average;
          info.push(message);
      })

      socket.on('disconnect', () =>{
          socket.close();
          console.log('Conexión del socket cerrada');
      });

      socket.on('test', (message) => {
          console.log(message);
          loggers.push(message);
      })
        
      ctrl.actualTime = new Date(Date.now()).toLocaleTimeString('es-CO');
    }]);