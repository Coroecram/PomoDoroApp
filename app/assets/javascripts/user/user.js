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
    o.createTodo = function(todo) {
      return $http.post('/users/' + todo.user_id + '/todos.json', todo).success(function(data){
        this.todos.push(data);
      });
    };

    return o;
}])
