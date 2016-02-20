angular.module('pomoDoro', [
  'ui.router',
  'templates',
  'Devise'
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
        resolve: {
          postPromise: ['Auth', 'user', function(Auth, user){
            return Auth.currentUser().then(function (currentUser) {
              user.getTodos(currentUser.id);
            });
          }]
        },
        onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function(currentUser) {
            if (!currentUser) { $state.go('signin') };
          })
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
        // onEnter: ['$state', 'Auth', function($state, Auth) {
        //   Auth.currentUser().then(function (){
        //     $state.go('home');
        //   })
        // }]
      })
      .state('user', {
        url: '/users/{id}',
        templateUrl: 'user/_user.html',
        controller: 'userController'
      });


  $urlRouterProvider.otherwise('home');
}])
