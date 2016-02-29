angular.module('pomoDoro')
.factory('user', [
  '$rootScope',
  '$http',
  '$q',
  function($rootScope, $http, $q){
    var o = {};
    o.getTodos = function(id) {
      var promise = $http.get('/users/' + id + '/todos.json').then(function(response){
          $rootScope.user.todos = [];
          angular.copy(response.data, $rootScope.user.todos);
          return response;
      }, function(response) {
          return $q.reject(response);
      });

      return promise;
    };
    o.createTodo = function(todo, id) {
      return $http.post('/users/' + id + '/todos.json', todo).success(function(data){
        $rootScope.user.todos.push(data);
      });
    };

    return o;
}])
