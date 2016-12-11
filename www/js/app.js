// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova', 'starter.directives'])






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

    var notificationOpenedCallback = function(jsonData) {
    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  };

 /* window.plugins.OneSignal
    .startInit("YOUR_APPID", "YOUR_GOOGLE_PROJECT_NUMBER_IF_ANDROID")
    .handleNotificationOpened(notificationOpenedCallback)
    .endInit();
*/
    
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

.state('app.message', {
    url: '/message',
    views: {
      'menuContent': {
        templateUrl: 'templates/message.html',
          controller: 'Messages'
      }
    }
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
    url: '/map',
    views: {
      'menuContent': {
        templateUrl: 'templates/map.html',
          controller: 'MapCtrl'
      }
    }
  })

.state('app.testmap', {
    url: '/testmap',
    views: {
      'menuContent': {
        templateUrl: 'templates/testmap.html',
          controller: 'TestmapCtrl'
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

  .state('app.manger', {
    url: '/manger',
    views: {
    'menuContent': {
    templateUrl: 'templates/manger.html',
    controller: 'MangerAddDriverCtrl'
      }
    }
  })

/*
.state('appDriver', {
    url: '/appDrier',
    abstract: true,
    templateUrl: 'templates/menuDriver.html',
    
  })


.state('appDriver.driver', {
    url: '/driver',
    views: {
      'menuContent': {
        templateUrl: 'templates/driver.html',
          controller: 'DriverCtrl'
      }
    }
  })
  */



.state('app.DriverOrderNonScedualing', {
    url: '/DriverOrderNonScedualing',
    views: {
      'menuContent': {
        templateUrl: 'templates/DriverOrderNonScedualing.html',
          controller: 'DriverOrderNonScedualingCtrl'
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



.state('app.tab', {
    url: '/tab',
    views: {
      'menuContent': {
        templateUrl: 'templates/tab.html',
          controller: 'tabCtrl'
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
  .state('app.addchildren', {
    url: '/addchildren',
    views: {
      'menuContent': {
        templateUrl: 'templates/addchildren.html',
        controller: 'AddChildrenCtrl'
      }
    }
})
  .state('app.mangerCheckADDChilde', {
    url: '/mangerCheckADDChilde',
    views: {
      'menuContent': {
        templateUrl: 'templates/mangerCheckADDChilde.html',
        controller: 'mangerCheckADDChildeCtrl'
      }
    }
})

 .state('app.updatedriver', {
    url: '/updatedriver',
    views: {
      'menuContent': {
        templateUrl: 'templates/updatedriver.html',
        controller: 'UpdatedriverCtrl'
      }
    }
}) 

.state('app.deleteDriver', {
    url: '/deleteDriver',
    views: {
      'menuContent': {
        templateUrl: 'templates/deleteDriver.html',
        controller: 'deleteDriverCtrl'
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
