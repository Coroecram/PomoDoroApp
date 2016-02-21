angular.module('pomoDoro')
.controller('userController', [
  '$scope',
  '$state',
  'user',
  function($scope, $state, user) {
    $scope.user = user.info;


}]);
