angular.module('pomoDoro')
.controller('sessionController', [
'$scope',
'$state',
'$http',
'Auth',
function($scope, $state, $http, Auth){
  var homepage = function () {
    $scope.failed = false;
    $scope.errors = [];
    $state.go('home');
  }
  Auth.currentUser().then(function() {
    homepage();
  });
  $scope.signin = function() {
    Auth.login($scope.user).then(function(){
      homepage();
    }, function(error) {
      $scope.failed = true;
      $scope.errors = "Invalid Email or Password";
      $scope.user.password = '';
    });
  };
  $scope.signup = function() {
    Auth.register($scope.user).then(function(){
      homepage();
    }, function(error){
      $scope.errors = [];
      error.data.errors.email ? $scope.errors.push("Email " + error.data.errors.email[0]) : '';
      error.data.errors.username ? $scope.errors.push("Username " + error.data.errors.username[0]) : '';
      error.data.errors.password ? $scope.errors.push("Password " + error.data.errors.password[0]) : '';
      error.data.errors.password_confirmation ? $scope.errors.push("Password Confirmation " + error.data.errors.password_confirmation[0]) : '';
      $scope.failed = true;
    });
  };
  $scope.guestUser = function() {
    $http.get('users/guest.json').then(function(response){
      homepage();
    }, function(error) {
      $scope.failed = true;
      $scope.errors = "Please Try Again";
    });
  };
}]);
