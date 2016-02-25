angular.module('pomoDoro')
.controller('sessionController', [
'$scope',
'$state',
'Auth',
function($scope, $state, Auth){
  Auth.currentUser().then(function() {
    $state.go('home');
  });
  $scope.failed = false;
  $scope.errors = [];
  $scope.signin = function() {
    var interval = setTimeout(function() {
      $scope.failed = true;
      $scope.errors = "Invalid Email or Password";
      $scope.user.password = '';
    }, 0); // hackiness because function(error) never called for 401
    Auth.login($scope.user).then(function(){
      clearTimeout(interval);
      $state.go('home');
    }, function(error) {
      // not called with the typical 401/ the intercept is an error but doesn't register here
    });
  };
  $scope.signup = function() {
    Auth.register($scope.user).then(function(){
      $scope.failed = false;
      $state.go('home');
    }, function(error){
      $scope.errors = [];
      error.data.errors.email ? $scope.errors.push("Email " + error.data.errors.email[0]) : '';
      error.data.errors.username ? $scope.errors.push("Username " + error.data.errors.username[0]) : '';
      error.data.errors.password ? $scope.errors.push("Password " + error.data.errors.password[0]) : '';
      error.data.errors.password_confirmation ? $scope.errors.push("Password Confirmation " + error.data.errors.password_confirmation[0]) : '';
      $scope.failed = true;
    });
  };
}]);
