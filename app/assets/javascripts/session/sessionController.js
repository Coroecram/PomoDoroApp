angular.module('pomoDoro')
.controller('sessionController', [
'$scope',
'$state',
'Auth',
function($scope, $state, Auth){
  Auth.currentUser().then(function() {
    $state.go('home');
  });
  $scope.signin = function() {
    Auth.login($scope.user).then(function(){
      $state.go('home');
    }, function(error){
      // **Auth (AngularDevise) bug** never gets called
    });
  };
  $scope.signup = function() {
    Auth.register($scope.user).then(function(){
      $state.go('home');
    }, function(error){
      // have to parse error.data.errors
    });
  };
}]);
