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
  $scope.countdown = 1500;

  $scope.start = function() {
    $scope.timerRunning = true;
    $scope.timerStarted ? $scope.$broadcast('timer-resume') : $scope.$broadcast('timer-start');
    $scope.timerStarted = true;
  };
  $scope.pause = function() {
    $scope.timerRunning = false;
    $scope.$broadcast('timer-stop');
  };
  $scope.reset = function() {
     if (($scope.timerStarted)) {
           $scope.$broadcast('timer-reset');
     }
     if ($scope.timerRunning) {
       $scope.start()
     }
  };
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
