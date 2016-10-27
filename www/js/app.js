// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })




.state('app.browse', {
      url: '/browse',

      views: {
        'menuContent': {
           abstract: true,
          templateUrl: 'templates/browse.html',
         controller: 'BrowseCtrl'}
      }
    })

.state('app.map', {
    url: '/browse/map',
    views: {
      'tab-chats': {
        templateUrl: 'templates/map.html',
          controller: 'MapCtrl'
      }
    }
  })


.state('app.loginPage', {
    url: '/loginPage',
    views: {
      'menuContent': {
        templateUrl: 'templates/loginPage.html',
          controller: 'loginPageCtrl'
      }
    }
  })
  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html',
          controller: 'MangerAddDriverCtrl'
      }
    }
  })

.state('app.driver', {
    url: '/driver',
    views: {
      'menuContent': {
        templateUrl: 'templates/driver.html',
          controller: 'DriverCtrl'
      }
    }
  })

.state('app.user', {
    url: '/user',
    views: {
      'menuContent': {
        templateUrl: 'templates/user.html',
          controller: 'UserCtrl'
      }
    }
  })


 

.state('app.chats', {
    url: '/chats',
    views: {
      'menuContent': {
        templateUrl: 'templates/chats.html',
          controller: 'ChatsCtrl'
      }
    }
  })


 .state('app.showDriver', {
    url: '/showDriver',
    views: {
      'menuContent': {
        templateUrl: 'templates/showDriver.html',
        controller: 'ShowDriverCtrl'
      }
    }
}) 



    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

   .state('app.register', {
      url: '/register',
      views: {
        'menuContent': {
          templateUrl: 'templates/register.html',
          controller: 'RegisterCtrl'
        }
      }
    })


  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
})



  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
