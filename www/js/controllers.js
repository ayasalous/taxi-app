angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  $scope.loginData = {};

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
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})


.controller('HomeCtrl', function($scope,$http) {
  $scope.user = {
    first: "Aya",
    last: "",
    email: "",
  };

  $scope.submitRegister = function(){
    console.log($scope.user);
    $http.post( API_URL + '/register',$scope.user)
    .then(function(response){
      console.log("Register process Done with response of:");
      console.log(response.data);
    });
  };


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


