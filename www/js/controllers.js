angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope,$rootScope, $ionicModal, $timeout,$rootScope,$http,$location,$state,$window) {

 ///$rootScope.hideDriverImg = false;///in fiixed image

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
    
  $timeout(function() {
      $scope.closeLogin();
    }, 1000);

  
};//fun do login


})//controller





.controller('loginPageCtrl', function($scope,$http, $rootScope,$state) {

       $scope.loginData = {};//must put outside of function submit
       $scope.doLogin = function() {
       console.log('Doing login', $scope.loginData.email,$scope.loginData.password);
       console.log( $scope.loginData);
       $http.post( API_URL +'looooginnn',$scope.loginData)
       .then(function(response){
       console.log("Register process Done with response of:");
       console.log(response.data);
       alert(response.data);
       alert(response.data.length);
       console.log(response.data.length); 
       var authEmail= response.data.length;
       console.log(response.data[9]);
       $rootScope.genericFirstName =response.data[2];//can used in any controller and any page 
       $rootScope.genericsecondName =response.data[3];
       $rootScope.genericOfficeName =response.data[10];
       $rootScope.generictype =response.data[1];//type of user login
       $rootScope.genericimage =response.data[8];//image of user login
       
       $rootScope.genericOfficeInputHidden={};

       console.log(  $rootScope.genericFirstName);
       console.log(  $rootScope.genericsecondName);
       console.log(  $rootScope.genericOfficeName);
       console.log(  $rootScope.genericOfficeName);

       //console.log(  $rootScope.genericOfficeInputHidden.nameoffice);
       // console.log(  $rootScope.genericOfficeInputHidden);
      
     
       if( response.data[9]=="inDB" )
       {//not in DB
        if (response.data[1]=="driver"){

        $state.go('app.driver');

        }
       if (response.data[1]=="manger"){
         $state.go('app.search');
        }
          if (response.data[1]=="user"){
         $state.go('app.user');
        }  
       
       }//if
        else{//inDB  
               $state.go('app.browse');
            }//else inDB
 });//fun then

  };//fun do login



})





.controller('MangerAddDriverCtrl', function($scope,$http, $rootScope,$state,$ionicLoading) {
      $scope.MangerAddDriver= {};
      $scope.result= "";
      $scope.MangerAddDriversubmit = function(){
      $ionicLoading.show();
      console.log($scope.MangerAddDriver);
      $http.post( API_URL +'MangerAddDriver',$scope.MangerAddDriver)
      .then(function(response){//send data from ionic to laravel then return sth
      $ionicLoading.hide();
      console.log("Register process Done with response of:");
      console.log( $scope.user);
      console.log(response.data);       
      console.log(response.data.localeCompare("notDone")); 
      console.log(response.data.length); 
      var a= response.data.length;
      if( a>5 )
      {
        $scope.result = "we have already user in this email " ;
      } else
        {
          $scope.result = '';
        }
    });
    };//fun MangerAddDriversubmit

      $scope.goShowDriver=function(){
      $state.go('app.showDriver');
      console.log(" in Fun goToRegisterPage");
      console.log(" before send data to laravel To ShowDriver ");
      console.log($rootScope.genericOfficeName);
      $scope.office={"nameoffice":$rootScope.genericOfficeName}; 
      $ionicLoading.show();
      console.log($scope.office);
      $http.post( API_URL +'showDriver',$scope.office)
      .then(function(response){//send data from ionic to laravel then return sth
      $ionicLoading.hide();
      console.log(response.data[0]['id']);
      console.log(response.data.length);
      for(var i=0;i < response.data.length;i++){
      $rootScope.ShowAllDriverOffice={
        "id":response.data[i]['id'],
        "firstname":response.data[i]['firstname'],
        "lastname":response.data[i]['lastname'],
        "email":response.data[i]['email'],
        "cardnum":response.data[i]['cardnum'],
        "phonenum":response.data[i]['phonenum'],
    };//scope
            }



   });
   
 };//fun

})

.controller('ShowDriverCtrl', function($scope,$http, $rootScope,$state) {
   console.log("in ShowDriver  controller");
   console.log($rootScope.genericOfficeName); 
   /*$scope.office={"nameoffice":$rootScope.genericOfficeName}; 
   //$ionicLoading.show();
   console.log($scope.office);
   $http.post( API_URL +'showDriver',$scope.office)
   .then(function(response){//send data from ionic to laravel then return sth
   //$ionicLoading.hide();
   console.log(response.data);


   });
*/

})



.controller('DriverCtrl', function($scope,$http, $rootScope,$state) {
      $scope.value={"answer":false};
      var value=$scope.value.answer;
      $scope.toggleChange = function() {
      if ($scope.value == false) {
       $scope.value = true;
       } else
       $scope.value = false;
       console.log('testToggle changed to ' + $scope.value);
       };


            
})




.controller('RegisterCtrl', function($scope,$http, $rootScope,$state,$ionicLoading) {
  $scope.result = "";
       ///////////////$rootScope.hideDriverImg = true;/// in fixed image 
      /*$http.get(API_URL + 'login').then(function(response){
      console.log(response.data);
      $scope.test = response.data;
      });*/
      $scope.user = {};
      $scope.submitRegister = function(){
      $ionicLoading.show();
      console.log($scope.user);
      $http.post( API_URL +'register',$scope.user)
      .then(function(response){//send data from ionic to laravel then return sth
      $ionicLoading.hide();
      console.log("Register process Done with response of:");
      console.log("  $scope.user.type ===="+  $scope.user.type);
      console.log( $scope.user);
      console.log(response.data);       
      console.log(response.data.localeCompare("notDone")); 
      console.log(response.data.length); 
      var a= response.data.length;
      if( a>5 ){
        $scope.result = "we have already user in this email " ;
     }else{
        $scope.result = '';
         $state.go('app.loginPage'); 
     }

    });//fun then

  };//fun submit
 $rootScope.genericName = "diver";
 $rootScope.typeuser =$scope.user.type;
})


.controller('HomeCtrl', function($scope,$http, $rootScope,$state) {
 $scope.goToRegisterPage=function(){
   $state.go('app.register');
   console.log(" in Fun goToRegisterPage");
 }
 $scope.goToLoginPage=function(){
   $state.go('app.loginPage');
   console.log(" in Fun goToRegisterPage");
 }

})

.controller('MapCtrl', function($scope, $state, $cordovaGeolocation) {
  var options = {timeout: 10000, enableHighAccuracy: true};
 
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
 
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
 
  }, function(error){
    console.log("Could not get location");
  });
})


.controller('UserCtrl', function($scope,$http, $rootScope,$state) {


console.log("in UserCtrl controller");

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


