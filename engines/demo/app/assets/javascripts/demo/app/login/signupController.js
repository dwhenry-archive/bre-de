'use strict'

angular.module('demoApp')
.controller('signupController', ['$scope', 'accountService', '$location', function($scope, accountService, $location) {
  if(accountService.loggedIn()) {
    progressToGames(true)
  }
  var user = $scope.user = {
    name: 'John1',
    email: 'john1@test.com',
    password: 'ybt4868i',
    password_confirmation: 'ybt4868i'
  };

  $scope.login = function() {
    accountService.create(user).then(progressToGames)
  }

  function progressToGames(success) {
    if(success) {
      $location.path('/games').replace()
    } else {
      alert('Invalid signup details')
    };
  }
}])



