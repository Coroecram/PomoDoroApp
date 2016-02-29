angular.module('pomoDoro')
.controller('userController', [
  '$rootScope',
  '$scope',
  '$state',
  'user',
  'Auth',
  function($rootScope, $scope, $state, user, Auth) {
    var checkAuth = function(id) {
      if(parseInt($state.params.id, 10) !== id) {
        $state.go('home');
      }
    };
    if(user.info) {
      checkAuth(user.info.id)
    } else {
      Auth.currentUser().then(function(response){
        checkAuth(response.id);
        if(!$rootScope.user.todos) {
          user.getTodos(response.id).then(function(response) {
            $rootScope.user.todos = response.data;
          });
        }
      });
    }
    $scope.editing = false;
    $scope.edit = function() { $scope.editing = true };
    $scope.stopEdit = function() { $scope.editing = false };
    $scope.saveChanges = function() { $scope.editing = false };
}]);
