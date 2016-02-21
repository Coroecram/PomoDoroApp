angular.module('pomoDoro')
.controller('todoController', [
'$scope',
'$state',
'todo',
function($scope, $state, todo) {
  $scope.todo = todo.todo;
}]);
