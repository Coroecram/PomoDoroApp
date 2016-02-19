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
        controller: 'MainCtrl',
      })

  $urlRouterProvider.otherwise('home');
}])
