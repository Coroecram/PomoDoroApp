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
        controller: 'mainController'
      })
      .state('signin', {
        url: '/signin',
        templateUrl: 'session/_signIn.html',
        controller: 'sessionController',
        // onEnter: ['$state', 'Auth', function($state, Auth) {
        //   Auth.currentUser().then(function (){
        //     $state.go('home');
        //   })
        // }]
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
        templateUrl: 'user/_todos.html',
        controller: 'userController',
        resolve: {
        todos: ['$stateParams', 'user', function($stateParams, user) {
                return user.getTodos($stateParams.id);
              }]
          }
      });


  $urlRouterProvider.otherwise('home');
}])
