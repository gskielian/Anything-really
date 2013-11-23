//app determines the scope of your functions
var app = angular.module('myapp', ['firebase','ngResource']);

app.controller('MyController', function($scope,angularFire) {

      // the following is your url for your firebase -- the place where all json files live
      //^^^this one got me, make sure to include a directory -- in this case "robot" else it won't work ^^^ 
      var ref = new Firebase("https://chesterlo.firebaseio.com/telerobot/drive");

      // literally looks for variable called "messages" in the controller's scope (between the tags it was included into) 
      $scope.messages = {};

    //binding -- the special way to bind the angular model to the database's model
    angularFire(ref, $scope, "messages");
      
      
$scope.message = angular.fromJson($scope.messages);
    //FINALLY, writing data to firebase

    //We define a function in order to bind data directly to the firebase
    $scope.sendCommand = function(command) {
      $scope.message = angular.fromJson($scope.messages);
      //$scope.messages.push({Fred : { movement : "forward", direction : direction }}); 
      ref.set({'direction' : command});
      }; 

    $scope.clearMessage = function() {
	//it's better to use firebase's removing as opposed to angular's
	//this makes it sure to reach the firebase
	ref.remove();
	};


});
