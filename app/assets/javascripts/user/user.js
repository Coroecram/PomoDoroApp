angular.module('pomoDoro')
.factory('user', [
  '$http',
  function($http){
    var o = {
      todos: []
    };
    o.getTodos = function(id) {
      return $http.get('/users/' + id + '/todos.json').success(function(data){
        angular.copy(data, o.todos);
      });
    };
    o.createTodo = function(todo, id) {
      return $http.post('/users/' + id + '/todos.json', todo).success(function(data){
        o.todos.push(data);
      });
    };

    return o;
}])
