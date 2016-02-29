angular.module('pomoDoro')
.controller('navController', [
'$scope',
'$state',
'$http',
'$q',
'Auth',
function($scope, $state, $http, $q, Auth){
  var guestCheck = function(user) {
    if(user.guestname) {
      $scope.user.username = user.guestname;
      $scope.user.email = user.guestname + "@grecian.myth";
    }
  }
  $scope.signedIn = Auth.isAuthenticated;

  $scope.signOut = function() {
    Auth.logout();
  };
  Auth.currentUser().then(function (user){
    $scope.user = user;
    guestCheck(user);
  });
  $scope.$on('devise:new-registration', function (e, user){
    $scope.user = user;
  });
  $scope.$on('devise:login', function (e, user){
    $scope.user = user;
    guestCheck(user);
  });
  $scope.$on('devise:logout', function (e, user){
    $scope.user = {};
    $state.go('signin');
  });
}]);
