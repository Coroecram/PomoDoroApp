angular.module('pomoDoro')
.controller('mainController', [
  'user',
  '$scope',
  'Auth',
  'ngTableParams',
  function($scope, user, Auth, ngTableParams) {
    $scope.todos = user.todos;
    $scope.signedIn = Auth.isAuthenticated;
    Auth.currentUser().then(function (currentUser){
      $scope.user = currentUser;
    });

    // $scope.usersTable = new ngTableParams({
    //             page: 1,
    //             count: 10
    //         }, {
    //             total: $scope.users.length,
    //             getData: function ($defer, params) {
    //                 $scope.data = $scope.users.slice((params.page() - 1) * params.count(), params.page() * params.count());
    //                 $defer.resolve($scope.data);
    //             }
    //         });

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
