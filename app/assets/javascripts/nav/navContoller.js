angular.module('pomoDoro')
.controller('navController', [
'$scope',
'$state',
'$http',
'$q',
'Auth',
function($scope, $state, $http, $q, Auth){
  $scope.signedIn = Auth.isAuthenticated;
  var newCSRF = function() {
    var promise = $http.get('/session/new_csrf.json').then(function(response){
        return response;
    }, function(response) {
        return $q.reject(response);
    });

    return promise;
  };
  $scope.signOut = function() {
    Auth.logout();
  };
  Auth.currentUser().then(function (user){
    $scope.user = user;
  });
  $scope.$on('devise:new-registration', function (e, user){
    $scope.user = user;
  });
  $scope.$on('devise:login', function (e, user){
    $scope.user = user;
  });
  $scope.$on('devise:logout', function (e, user){
    $scope.user = {};
    $state.go('signin');
  });
}]);
