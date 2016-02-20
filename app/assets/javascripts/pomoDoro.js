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
        controller: 'mainController',
        onEnter: ['$state', 'Auth', 'user', function($state, Auth, user) {
          Auth.currentUser().then(function(currentUser) {
              user.getTodos(currentUser.id);
            }, function(error) {
              $state.go('signin');
            });
          }]
      })
      .state('signin', {
        url: '/signin',
        templateUrl: 'session/_signIn.html',
        controller: 'sessionController'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'session/_signUp.html',
        controller: 'sessionController',
      })
      .state('user', {
        url: '/users/{id}',
        templateUrl: 'user/_user.html',
        controller: 'userController'
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
