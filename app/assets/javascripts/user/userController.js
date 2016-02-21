angular.module('pomoDoro')
.controller('userController', [
  '$scope',
  '$state',
  'user',
  'Auth',
  function($scope, $state, user, Auth) {
    $scope.$on('devise:unauthorized', function(event, xhr, deferred) {
      $state.go('signin');
    });
    if(!user.info) {
      Auth.currentUser().then(function(response){
        user.setInfo(response);
        user.getTodos().then(function() {
          $scope.user = user;
        });
      });
    }
    $scope.user = user;
    $scope.editing = false;
    $scope.edit = function() { $scope.editing = true };
    $scope.stopEdit = function() { $scope.editing = false };
    $scope.saveChanges = function() { $scope.editing = false };
}]);
