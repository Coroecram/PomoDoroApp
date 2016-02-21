angular.module('pomoDoro')
.factory('todo', [
  '$http',
  '$filter',
  function($http, $filter) {
    var o = {};

    o.setTodo = function(todo) {
      o.todo = todo;
    };
    o.getTodo = function(userID, todoID) {
      var promise = $http.get('/users/' + userID + '/todos/' + todoID + '.json').then(function(response){
          o.setTodo(response.data);
          return response;
      }, function(response) {
          return $q.reject(response);
      });

      return promise;
    };
    o.completePomo = function() {
      var promise = $http.patch('/users/' + o.todo.user_id + '/todos/' + o.todo.id + '/complete.json').then(function(response){
          return response;
      }, function(response) {
          return $q.reject(response);
      });

      return promise;
    };

    return o;
}]);
