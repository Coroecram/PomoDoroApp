angular.module('pomoDoro')
.controller('sessionController', [
'$rootScope',
'$scope',
'$state',
'$http',
'Auth',
function($rootScope, $scope, $state, $http, Auth){
  var homepage = function () {
    $scope.failed = false;
    $scope.errors = [];
    $state.go('home');
  }
  Auth.currentUser().then(function() {
    $rootScope.user.todos = {};
    homepage();
  }, function() {
    $rootScope.user = {};
  });
  $scope.signin = function() {
    Auth.login($rootScope.user).then(function(){
      homepage();
    }, function(error) {
      $scope.failed = true;
      $scope.errors = "Invalid Email or Password";
      $rootScope.user.password = '';
    });
  };
  $scope.signup = function() {
    Auth.register($rootScope.user).then(function(){
      homepage();
    }, function(error){
      $scope.errors = [];
      error.data.errors.email ? $scope.errors.push("Email " + error.data.errors.email[0]) : '';
      error.data.errors.username ? $scope.errors.push("Username " + error.data.errors.username[0]) : '';
      error.data.errors.password ? $scope.errors.push("Password " + error.data.errors.password[0]) : '';
      error.data.errors.password_confirmation ? $scope.errors.push("Password Confirmation " + error.data.errors.password_confirmation[0]) : '';
      $scope.failed = true;
    });
  };
  $scope.guestUser = function() {
    $http.get('users/guest.json').then(function(response){
      var inputEmail = response.data.guestname + "@grecian.myth";
      var i = 0;
      var j = 0;
      var emailField = $('.user-email');
      var passwordField = $('.user-password')
      emailField.val("");
      passwordField.val("");
      var inputLoop = function(email) {
        setTimeout(function () {
          emailField.val(emailField.val() + email[i]);
          i++;
          if(j < 8) {
            passwordField.val(passwordField.val() + "x");
            j++;
          }
          if (i < email.length) {
            inputLoop(email);
          } else {
            setTimeout(function () { homepage() }, 250);
          }
        }, 100)
      };
      inputLoop(inputEmail);
    }, function(error) {
      $scope.failed = true;
      $scope.errors = "Please Try Again";
    });
  };
}]);
