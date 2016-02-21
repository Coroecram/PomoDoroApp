angular.module('pomoDoro')
.controller('mainController', [
  '$scope',
  '$http',
  '$filter',
  'user',
  'Auth',
  'ngTableParams',
  function($scope, $http, $filter, user, Auth, ngTableParams) {
    $scope.todos = user.todos;
    $scope.signedIn = Auth.isAuthenticated;
    Auth.currentUser().then(function (currentUser){
      $scope.user = currentUser;

      $http.get('/users/' + currentUser.id + '/todos.json')
       .success(function(data, status) {
         for (var i = 0; i < data.length; i++) {
           data[i].time_started = (data[i].time_started ? new Date(data[i].time_started) : '');
           data[i].time_finished = (data[i].time_finished ? new Date(data[i].time_finished) : '');
           data[i].planned = (data[i].planned ? new Date(data[i].planned) : '');
         }
         $scope.data = data;

         $scope.todoTable = new ngTableParams({
             page: 1,
             count: 3,
             sorting: {
                 completed_pomos: 'asc'
             }
         }, {
            counts: [1,3,5,10],
             total: $scope.data.length,
             getData: function($defer, params) {
                 var orderedData = params.sorting() ?
                                     $filter('orderBy')($scope.data, params.orderBy()) :
                                     $scope.data;

                 $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
             }
           });
       });
    });
    $scope.addTodo = function() {
      if (!$scope.title || $scope.title === '' && $scope.user.id) { return };
          var todo = {
                      title: $scope.title,
                      description: $scope.desc,
                      user_id: $scope.user.id
                      };
          $http.post('/users/' + todo.user_id + '/todos.json', todo).success(function(data){
            $scope.data.push(data);
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
