angular.module('pomoDoro')
.controller('navController', [
'$scope',
'$state',
'$http',
'$q',
'Auth',
function($scope, $state, $http, $q, Auth){
  $scope.signedIn = Auth.isAuthenticated;

  $scope.signOut = function() {
    Auth.logout();
  };
  Auth.currentUser().then(function (user){
    $scope.user = user;
    if(user.guestname) {
      $scope.user.username = user.guestname;
    }
  });
  $scope.$on('devise:new-registration', function (e, user){
    $scope.user = user;
  });
  $scope.$on('devise:login', function (e, user){
    $scope.user = user;
    if(user.guestname) {
      $scope.user.username = user.guestname;
    }
  });
  $scope.$on('devise:logout', function (e, user){
    $scope.user = {};
    $state.go('signin');
  });
}]);
