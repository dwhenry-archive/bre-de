'use strict'

angular.module('demoApp')
.controller('gamesController', ['$scope', '$location', 'accountService', 'gamesService',
    function($scope, $location, accountService, gamesService) {
  $scope.user = user = accountService.getUser();


  gamesService.forUser(user).then(function(games) {
    $scope.games = games;
  })

  $scope.newGame = function() {
    $location.path('/games/new').replace()
  }
}])



