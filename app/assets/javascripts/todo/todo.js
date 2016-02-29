angular.module('pomoDoro')
.factory('todo', [
  '$http',
  '$filter',
  '$q',
  function($http, $filter, $q) {
    var o = {};

    o.setTodo = function(todo) {
      todo.time_started = o.noSeconds(todo.time_started);
      todo.time_finished = o.noSeconds(todo.time_finished);
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
    o.deleteTodo = function() {
      var promise = $http.delete('/users/' + o.todo.user_id + '/todos/' + o.todo.id + '.json').then(function(response){
          o.setTodo(response.data);
          return response;
      }, function(response) {
          return $q.reject(response);
      });

      return promise;
    };
    o.completeTodo = function() {
      var promise = $http.patch('/users/' + o.todo.user_id + '/todos/' + o.todo.id + '/complete.json').then(function(response){
          return response;
      }, function(response) {
          return $q.reject(response);
      });

      return promise;
    };
    o.startTodo = function() {
      var promise = $http.patch('/users/' + o.todo.user_id + '/todos/' + o.todo.id + "/start_now.json").then(function(response){
          return response;
      }, function(response) {
          return $q.reject(response);
      });

      return promise;
    };
    o.editTodo = function(params) {
      var promise = $http.patch('/users/' + o.todo.user_id + '/todos/' + o.todo.id + '.json', params).then(function(response){
          return response;
      }, function(response) {
          return $q.reject(response);
      });

      return promise;
    };
    o.completePomo = function() {
      var promise = $http.patch('/users/' + o.todo.user_id + '/todos/' + o.todo.id + '/complete_pomo.json').then(function(response){
          return response;
      }, function(response) {
          return $q.reject(response);
      });

      return promise;
    };
    o.noSeconds = function(time) {
      var coeff = 1000 * 60; // deal only in whole minutes.
      if(time) {
        var timeObject = new Date(time);
        time = new Date(Math.round(timeObject.getTime() / coeff) * coeff);
      }

      return time;
    }

    return o;
}]);
