angular.module('pomoDoro')
.controller('todoController', [
'$scope',
'$state',
'$filter',
'todo',
function($scope, $state, $filter, todo) {
  var finishFailSafe = function() {
    $scope.todo.completed_pomos += 1;
    $scope.reset();
  };
  var getTodo = function(success, failure) {
    todo.getTodo($state.params.id, $state.params.todoID).then(function(response){
      success(response);
    }, function(error) {
      failure(error);
    });
  };
  if(todo.todo) {
    $scope.todo = todo.todo
  } else {
    var success = function(response) { $scope.todo = response.data; };
    var failure = function (error) { $state.go('home'); };
    getTodo(success, failure);
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
  $scope.timerFinished = function() {
    $scope.timerRunning = false;
    var success = function(response) {
      $scope.todo = response.data;
      $scope.reset();
    };
    var failure = function(error) {
      finishFailSafe();
    }
    todo.completePomo().then(function(response) {
      getTodo(success, failure);
    }, function(error) {
        finishFailSafe();
    });
  };
  $scope.deleteTodo = function() {
    todo.deleteTodo()
      .then(function(response){
        $state.go('home');
      }, function(error) {
        $state.go('home');
      })
  };
  $scope.completeTodo = function() {
    $scope.timerRunning = false;
    var success = function(response) {
      $scope.todo = response.data;
      $scope.reset();
    };
    var failure = function(error) {
      finishFailSafe();
    }
    todo.completeTodo().then(function(response) {
      getTodo(success, failure);
    }, function(error) {
        finishFailSafe();
    });
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
