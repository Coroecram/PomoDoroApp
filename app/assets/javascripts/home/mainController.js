angular.module('pomoDoro')
.controller('mainController', [
  '$scope',
  '$state',
  'user',
  function($scope, $state, todos) {
    $scope.todos = todos.todos;
    $scope.user_id = $state.params.id;

    $scope.addTodo = function() {
      if (!$scope.title || $scope.title === '') { return };
      todos.createTodo(
      {
        title: $scope.title,
        description: $scope.desc,
        user_id: $scope.user_id
      });
      $scope.title = '';
      $scope.desc = '';
    };

    $scope.iterate = function(max) {
      var iterated = [];
      for (var i = 0; i < max; i++) {
        iterated.push(i);
      }
      return iterated;
    };

}]);
