angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$rootScope,$http) {

 

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  

   $scope.loginData = {};//must put outside of function submit
   $scope.doLogin = function() {
     console.log('Doing login', $scope.loginData.email,$scope.loginData.password);
     console.log("  $scope.loginData ===="+  $scope.loginData);
 ////////////
 $http.post( API_URL +'looooginnn',$scope.loginData.email,$scope.loginData.password)
    .then(function(response){///take data from laravel to ionic returrrrrrrrn
    console.log("Register process Done with response of:");
      console.log(response.data);
       alert(response.data);
    });//fun then

     ////////////
  /* $timeout(function() {
      $scope.closeLogin();
    }, 1000);
*/
  };//fun do login


})//controller



///////////////////MEEEEEEEEEEEE/////////////////
.controller('HomeCtrl', function($scope,$http, $rootScope) {
  $scope.test = "Ana Test";

  /*$http.get(API_URL + 'login').then(function(response){
    console.log(response.data);
    $scope.test = response.data;
  });*/
$scope.user = {};
//send data from ionic to laravel  submiiiiiiiiiiiiiiiit buttton
  $scope.submitRegister = function(){
  console.log($scope.user);
    $http.post( API_URL +'register',$scope.user)
    .then(function(response){///take data from laravel to ionic returrrrrrrrn
    console.log("Register process Done with response of:");
     console.log("  $scope.user.type ===="+  $scope.user.type);
      console.log( $scope.user);
      console.log(response.data);
       alert(response.data);       
        console.log(response.data.localeCompare("notDone")); 
      console.log(response.data.length); 
      var a= response.data.length;
       if( a>5 )
       document.getElementById("resultregister").innerHTML = "we have already user in this email " ;
     else        document.getElementById("resultregister").innerHTML = "" ;

    });//fun then

  };//fun submit

 $rootScope.genericName = "diver";

 $rootScope.typeuser =$scope.user.type;


})






.controller('PlaylistsCtrl', function($scope,$http) {
  $scope.registerUser = function(){

    $http.post('http://localhost:8000/api/register',{email:"ayasalous12343@gmail.com",password:"123"})
    .then(function(data){    
      console.log('aya salous in ioniccc');
      console.log(data.response);

    });
    alert("registerUser btn has been clicked!");
  }
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});


