angular.module('prueba', [])
    .controller('Controller', ['$scope',($scope) => {
      let socket = io('http://localhost:3100/hour');
      let interval = null;

      $scope.loggers = [];
      $scope.info = [];
      $scope.actualTime = new Date();
      $scope.actualTime.setTime( $scope.actualTime.getTime() - 100000 );

      interval = setInterval( () => {
        $scope.actualTime.setTime( $scope.actualTime.getTime() + 1000 );
        $scope.countryTime = new Date($scope.actualTime).toLocaleTimeString('es-CO');
        $scope.$apply();
      }, 1000);

      socket.on( 'print', (message) => {
        $scope.timeServer = new Date(message.timeServer).toLocaleTimeString('es-CO');
        $scope.myTime = new Date(message.myTime).toLocaleTimeString('es-CO');
        $scope.difference = message.difference;
        $scope.average = message.average;
        $scope.adjustment =  new Date(Math.abs(message.myTime - message.average)).toLocaleTimeString('es-CO');
          console.log("Llego como reporte al servidor: ",message);
          $scope.countryTime = $scope.adjustment;
          $scope.info.push({
              no : $scope.info.length, 
              timeServer : $scope.timeServer, 
              myTime : $scope.myTime, 
              difference : $scope.difference,
              average : $scope.average,
              adjustment : $scope.adjustment
            });
          $scope.$apply();
      })

      socket.on('disconnect', () =>{
          socket.close();
          console.log('Conexión del socket cerrada');
      });

      socket.on('test', (message) => {
          console.log(message);
          $scope.loggers.push(message);
          console.log($scope.loggers);
          $scope.$apply();
      });

      //Metodo de mandar la Hora
      socket.on('time', (message) => {
        console.log("Me estan pidiendo la hora");
        socket.emit('send', { socket: socket.id, hour : $scope.actualTime.getTime() });
        console.log('Envio la respuesta mandando la hora');
      });

      //LLega la hora al cliente
      socket.on('newTime', (message) =>{
          //clearInterval(interval);
          console.log($scope.actualTime, "Antes");
          console.log(message.difference);
          $scope.newHour = new Date($scope.actualTime.getTime() + message.difference);
          $scope.info.push({
            no : $scope.info.length, 
            myTime : $scope.actualTime.toLocaleTimeString('es-CO'), 
            adjustment : message.difference,
            result :  $scope.newHour.toLocaleTimeString('es-CO')
          });
          $scope.actualTime.setTime($scope.newHour);
          console.log($scope.actualTime, "Despues ");
          
        $scope.$apply(); 
      })
    }]);
