angular.module('pomoDoro')
.filter('noSeconds', function() {
  return function(time) {
    var coeff = 1000 * 60; // deal only in whole minutes.
    if(time) {
      var timeObject = new Date(time);
      time = new Date(Math.round(timeObject.getTime() / coeff) * coeff);
    }

    return time;
  };
})
.controller('mainController', [
  '$rootScope',
  '$scope',
  '$http',
  '$filter',
  '$state',
  'user',
  'todo',
  'Auth',
  'ngTableParams',
  function($rootScope, $scope, $http, $filter, $state, user, todo, Auth, ngTableParams) {
    Auth.currentUser().then(function(data) {
      if(!$rootScope.user) {
        $rootScope.user = data;
      }
      user.getTodos(data.id)
       .then(function(response) {
         $scope.todos = response.data;
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
      var id = $rootScope.user.id;
      todo.setTodo(passedTodo);
      $state.transitionTo('todo', {id: id, todoID: passedTodo.id});
    };
    $scope.addTodoPage = function() {
      $state.transitionTo('new-todo', {id: $rootScope.user.id});
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
                    user_id: $rootScope.user.id
                  };

          $http.post('/users/' + $rootScope.user.id + '/todos.json', params).then(function(data){
            $scope.todos.push(data);
            $rootScope.user.todos.push(data);
            $state.go('home');
            $scope.todoTable.reload();
            $scope.title = '';
            $scope.description = '';
            $scope.expected_pomos = undefined;
          }, function(error) {
                alert(error.data);
          });
    };
}]);
