angular.module('pomoDoro')
.controller('userController', [
  '$scope',
  '$state',
  'user',
  'Auth',
  function($scope, $state, user, Auth) {
    var checkAuth = function(id) {
      if(parseInt($state.params.id, 10) !== id) {
        $state.go('home');
      }
    };
    if(user.info) {
      checkAuth(user.info.id)
      $scope.user = user;
    } else {
      Auth.currentUser().then(function(response){
        checkAuth(response.id);
        user.setInfo(response);
        user.getTodos().then(function() {
          $scope.user = user;
        });
      });
    }
    $scope.editing = false;
    $scope.edit = function() { $scope.editing = true };
    $scope.stopEdit = function() { $scope.editing = false };
    $scope.saveChanges = function() { $scope.editing = false };
}]);
