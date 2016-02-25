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
      retrievedTodo(response.data);
      success(response);
    }, function(error) {
      failure(error);
    });
  };
  var retrievedTodo = function(retrieved) {
    var todo = filterSeconds(retrieved)
    $scope.todo = todo;
    $scope.edit = todo;
  };
  var filterSeconds = function(todo) {
    var coeff = 1000 * 60; // deal only in whole minutes.
    if(todo.time_started) {
       var time_started = new Date(todo.time_started)
       todo.time_started = new Date(Math.round(time_started.getTime() / coeff) * coeff);
     }
     if(todo.time_finished) {
       var time_finished = new Date(todo.time_finished);
       todo.time_finished = new Date(Math.round(time_finished.getTime() / coeff) * coeff);
     }
     if(todo.planned) {
       var planned = new Date(todo.planned);
       todo.planned = new Date(Math.round(planned.getTime() / coeff) * coeff);
     }
     $scope.todo = todo;
     $scope.edit = todo;
     return todo;
  };
  if(todo.todo) {
    $scope.todo = todo.todo;
    $scope.edit = todo.todo;
  } else {
    var success = function(response) {
      $scope.todo = response.data;
      $scope.edit = response.data;
    };
    var failure = function (error) { $state.go('home'); };
    getTodo(success, failure);
  }

  $scope.countdown = 1500;

  $scope.start = function() {
    $scope.timerRunning = true;
    $scope.timerStarted ? $scope.$broadcast('timer-resume') : $scope.$broadcast('timer-start');
    $scope.timerStarted = true;
    if(!$scope.todo.started || !$scope.todo.time_started) {
      todo.startTodo().then(function() {
        getTodo(function(){}, function(){});
      })
    }
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
      retrieveTodo(response.data);
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
  $scope.editTodoPage = function() {
    $state.transitionTo('edit-todo', {id: $state.params.id, todoID: $state.params.todoID});
  };
  $scope.cancel = function() {
    $state.edit = $state.todo;
    $state.transitionTo('todo', {id: $state.params.id, todoID: $state.params.todoID});
  };
  $scope.editTodo = function() {
    if (!$scope.edit.title || $scope.edit.title === '') { return };
    var params = {
                  title: $scope.edit.title,
                  description: $scope.edit.description,
                  time_started: $scope.edit.time_started,
                  time_finished: $scope.edit.time_finished,
                  started: $scope.edit.started,
                  finished: $scope.edit.finished,
                  completed_pomos: $scope.edit.completed_pomos,
                  expected_pomos: $scope.edit.expected_pomos,
                  user_id: $scope.todo.user_id
                };
    var success = function(response) {
      $state.transitionTo('todo', {id: $state.params.id, todoID: $state.params.todoID});
    };
    var failure = function (error) {
      console.log(error);
    };

    todo.editTodo(params).then(function(response){
      getTodo(success, failure);
    }, function(error){
      alert(error.data);
    });
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
  };
}]);
