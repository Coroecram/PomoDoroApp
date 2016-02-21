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

      // $scope.todoTable = new ngTableParams({
      //   page: 1,
      //   count: 3
      // }, {
      //     getData: function ($defer, params) {
      //       $http.get('/users/' + currentUser.id + '/todos.json',
      //       {params: {
      //                 pageNumber: params.page()-1,
      //                 rangeStart: rangeStart,
      //                 rangeStop: rangeStop
      //       }}).success(function(data, status) {
      //           params.total(data.length);
      //           $defer.resolve(data);
      //       })
      //     }
      // })
    });
    $scope.addTodo = function() {
      if (!$scope.title || $scope.title === '' && $scope.user.id) { return };
        user.createTodo(
      {
        title: $scope.title,
        description: $scope.desc,
        user_id: $scope.user.id
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

}]);
