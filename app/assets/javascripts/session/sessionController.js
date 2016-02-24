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
  $scope.errors = "";
  $scope.signin = function() {
    var interval = setTimeout(function() {
      $scope.failed = true;
      $scope.errors = "Invalid Email or Password";
    }, 0); // hackiness because function(error) never called
    Auth.login($scope.user).then(function(){
      clearTimeout(interval);
      $state.go('home');
    }, function(error) {
      debugger
      // never called under any circumstances
    });
  };
  $scope.signup = function() {
    Auth.register($scope.user).then(function(){
      $state.go('home');
    }, function(error){
      $scope.failed = true;
      debugger
      // have to parse error.data.errors
    });
  };
}]);
