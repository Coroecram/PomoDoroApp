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
    $scope.$on('devise:unauthorized', function(event, xhr, deferred) {
      $state.go('signin');
    });
    $scope.signedIn = Auth.isAuthenticated;
    Auth.currentUser().then(function() {
      user.setInfo(Auth._currentUser);
      $scope.user = Auth._currentUser;

      user.getTodos()
       .then(function(response) {
         var data = user.todos;
         for (var i = 0; i < data.length; i++) {
           data[i].time_started = (data[i].time_started ? new Date(data[i].time_started) : '');
           data[i].time_finished = (data[i].time_finished ? new Date(data[i].time_finished) : '');
           data[i].planned = (data[i].planned ? new Date(data[i].planned) : '');
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
     });
    $scope.todoPage = function (passedTodo){
      var id = $scope.user.id;
      todo.setTodo(passedTodo);
      $state.transitionTo('todo', {id: id, todoID: passedTodo.id});
    };
    $scope.addTodo = function() {
      if (!$scope.title || $scope.title === '' && $scope.user.id) { return };
          var todo = {
                      title: $scope.title,
                      description: $scope.desc,
                      user_id: $scope.user.id
                      };
          $http.post('/users/' + todo.user_id + '/todos.json', todo).success(function(data){
            $scope.todos.push(data);
            $scope.todoTable.reload();
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
    $scope.formatTime = function(date) {
      return $filter('date')(date, 'MMM d, yyyy hh:mm a')
    }

}]);
