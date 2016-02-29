angular.module('pomoDoro')
.controller('navController', [
'$rootScope',
'$scope',
'$state',
'$http',
'Auth',
function($rootScope, $scope, $state, $http, Auth){
  var guestCheck = function(user) {
    if(user.guestname) {
      $rootScope.user.username = user.guestname;
      $rootScope.user.email = user.guestname + "@grecian.myth";
    }
  }
  $scope.signedIn = Auth.isAuthenticated;

  $scope.signOut = function() {
    Auth.logout();
  };
  Auth.currentUser().then(function (user){
    $rootScope.user = user;
    guestCheck(user);
  });
  $scope.$on('devise:new-registration', function (e, user){
    $rootScope.user = user;
  });
  $scope.$on('devise:login', function (e, user){
    $rootScope.user = user;
    guestCheck(user);
  });
  $scope.$on('devise:logout', function (e, user){
    $rootScope.user = {};
    $state.go('signin');
  });
}]);
