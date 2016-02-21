angular.module('pomoDoro', [
  'ui.router',
  'templates',
  'Devise',
  'ngTable',
  'timer'
])
.config(function(AuthInterceptProvider) {
        AuthInterceptProvider.interceptAuth(true);
})
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
        controller: 'sessionController'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'session/_signUp.html',
        controller: 'sessionController'
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
      })
      .state('todo', {
        url: '/users/{id}/todos/{todoID}',
        templateUrl: 'todo/_todo.html',
        controller: 'todoController',
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
