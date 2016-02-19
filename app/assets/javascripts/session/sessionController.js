angular.module('pomoDoro')
.controller('sessionController', [
'$scope',
'$state',
'Auth',
function($scope, $state, Auth){
  $scope.signin = function() {
    Auth.login($scope.user).then(function(){
      $state.go('home');
    }, function(error){
      debugger
    });
  };

  $scope.signup = function() {
    Auth.register($scope.user).then(function(){
      $state.go('home');
    }, function(error){
      });
  };
}]);
