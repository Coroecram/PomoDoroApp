angular.module('pomoDoro', [
  'ui.router',
  'templates',
  'Devise'
])
.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
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
        Auth.currentUser().then(function (){
        $state.go('home');
      })
      .state('signup', {
        url: '/signUp',
        templateUrl: 'session/_signUp.html',
        controller: 'sessionController',
        onEnter: ['$state', 'Auth', function($state, Auth) {
        Auth.currentUser().then(function (){
        $state.go('home');
      });

  $urlRouterProvider.otherwise('home');
}])
