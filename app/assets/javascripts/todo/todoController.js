angular.module('pomoDoro')
.controller('todoController', [
'$scope',
'$state',
'$filter',
'todo',
function($scope, $state, $filter, todo) {
  if(todo.todo) {
    $scope.todo = todo.todo
  } else {
    todo.getTodo($state.params.id, $state.params.todoID).then(function(response){
      $scope.todo = response.data;
    }, function(error) {
      $state.go('home');
    });
  }
  $scope.timer = false;
  $scope.countdown = "25:00";

  $scope.start = function() {

  }

  $scope.iterate = function(max) {
    var iterated = [];
    for (var i = 0; i < max; i++) {
      iterated.push(i);
    }
    return iterated;
  };
  $scope.formatTime = function(date) {
    return $filter('date')(date, 'MMM d, yyyy hh:mm a')
  }
}]);
