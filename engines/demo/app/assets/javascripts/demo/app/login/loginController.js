'use strict'

angular.module('demoApp')
.controller('loginController', ['$scope', 'accountService', '$location', function($scope, accountService, $location) {
  if(accountService.loggedIn()) {
    progressToGames(true)
  }
  $scope.user = accountService.getUser(true);
  $scope.login = function() {
    accountService.login().then(progressToGames)
  }

  function progressToGames(success) {
    if(success) {
      $location.path('/games').replace()
    } else {
      alert('Invalid login details')
    };
  }
}])



