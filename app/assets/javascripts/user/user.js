angular.module('pomoDoro')
.factory('user', [
  '$http',
  '$q',
  function($http, $q){
    var o = {
      todos: []
    };
    o.setInfo = function(user) {
      o.info = user;
    };
    o.getTodos = function() {
      var promise = $http.get('/users/' + o.info.id + '/todos.json').then(function(response){
          angular.copy(response.data, o.todos);
          return response;
      }, function(response) {
          return $q.reject(response);
      });

      return promise;
    };
    o.createTodo = function(todo, id) {
      return $http.post('/users/' + id + '/todos.json', todo).success(function(data){
        o.todos.push(data);
      });
    };

    return o;
}])
