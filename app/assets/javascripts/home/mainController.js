angular.module('pomoDoro')
.controller('mainController', [
  '$scope',
  '$http',
  '$filter',
  '$state',
  'user',
  'todo',
  'Auth',
  'ngTableParams',
  function($scope, $http, $filter, $state, user, todo, Auth, ngTableParams) {
    Auth.currentUser().then(function(data) {
      user.setInfo(data);
      $scope.user = data;
      user.getTodos()
       .then(function(response) {
         var data = user.todos;
         var coeff = 1000 * 60; // deal only in whole minutes.
         for (var i = 0; i < data.length; i++) {
           if(data[i].time_started) {
              var time_started = new Date(data[i].time_started)
              data[i].time_started = new Date(Math.round(time_started.getTime() / coeff) * coeff);
            }
            if(data[i].time_finished) {
              var time_finished = new Date(data[i].time_finished);
              data[i].time_finished = new Date(Math.round(time_finished.getTime() / coeff) * coeff);
            }
            if(data[i].planned) {
              var planned = new Date(data[i].planned);
              data[i].planned = new Date(Math.round(planned.getTime() / coeff) * coeff);
            }
         }
         $scope.todos = data;
         $scope.todoTable = new ngTableParams({
             page: 1,
             count: 3,
             sorting: {
                 completed_pomos: 'asc'
             }
         }, {
            counts: [1,3,5,10],
             total: $scope.todos.length,
             getData: function($defer, params) {
                 var orderedData = params.sorting() ?
                                     $filter('orderBy')($scope.todos, params.orderBy()) :
                                     $scope.todos;

                 $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
             }
           });
       });
     }, function(unauthorized) {
       $state.go('signin');
     });
    $scope.todoPage = function (passedTodo){
      var id = $scope.user.id;
      todo.setTodo(passedTodo);
      $state.transitionTo('todo', {id: id, todoID: passedTodo.id});
    };
    $scope.addTodoPage = function() {
      $state.transitionTo('new-todo', {id: $scope.user.id});
    };
    $scope.cancel = function() {
      $state.go('home');
    };
    $scope.addTodo = function() {
      if (!$scope.title || $scope.title === '') { return };
      var params = {
                    title: $scope.title,
                    description: $scope.description,
                    time_started: $scope.time_started,
                    time_finished: $scope.time_finished,
                    started: $scope.started,
                    finished: $scope.finished,
                    completed_pomos: $scope.completed_pomos,
                    expected_pomos: $scope.expected_pomos,
                    user_id: $scope.user.id
                  };

          $http.post('/users/' + $scope.user.id + '/todos.json', params).then(function(data){
            $scope.todos.push(data);
            $state.go('home');
            $scope.todoTable.reload();
            $scope.title = '';
            $scope.description = '';
            $scope.expected_pomos = undefined;
          }, function(error) {
                alert(error.data);
          });
    };
    $scope.formatTime = function(date) {
      return $filter('date')(date, 'MMM d, yyyy hh:mm a')
    }
}]);
