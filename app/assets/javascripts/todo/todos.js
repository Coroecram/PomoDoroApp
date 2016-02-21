angular.module('pomoDoro')
.factory('todo', [
  '$http',
  '$q',
  function($http, $q) {
    var o = {};

    o.setTodo = function(todo) {
      o.todo = todo;
    };
    o.getTodo = function(userID, todoID) {
      var promise = $http.get('/users/' + o.info.id + '/todos/' + todoID).then(function(response){
          angular.copy(response.data, o.todo);
          return response;
      }, function(response) {
          return $q.reject(response);
      });

      return promise;
    };

    return o;
}]);
