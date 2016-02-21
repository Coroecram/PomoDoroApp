angular.module('pomoDoro', [
  'ui.router',
  'templates',
  'Devise',
  'ngTable',
])
.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$httpProvider',
  function($stateProvider, $urlRouterProvider, $httpProvider) {
    $httpProvider.defaults.withCredentials = true;
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'home/_home.html',
        controller: 'mainController'
      })
      .state('signin', {
        url: '/signin',
        templateUrl: 'session/_signIn.html',
        controller: 'sessionController',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          if(Auth.isAuthenticated()) {
              $state.go('home');
            }
          }]
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'session/_signUp.html',
        controller: 'sessionController',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          if(Auth.isAuthenticated()) {
              $state.go('home');
            }
          }]
      })
      .state('user', {
        url: '/users/{id}',
        templateUrl: 'user/_user.html',
        controller: 'userController',
        onEnter: ['$state', 'Auth', 'user', function($state, Auth, user) {
          Auth.currentUser().then(function(currentUser) {
              parseInt($state.params.id, 10) == currentUser.id ? true : $state.go('home');
            }, function(error) {
              $state.go('signin');
            });
          }]
      });


  $urlRouterProvider.otherwise('home');
}])

// resolve: {
//   postPromise: ['Auth', 'user', function(Auth, user){
//     return Auth.currentUser().then(function (currentUser) {
//       user.getTodos(currentUser.id);
//     });
//   }]
// },
