'use strict'

angular.module('demoApp')
.controller('gamesController', ['$scope', '$location', 'accountService', 'gamesService', function($scope, $location, accountService, gamesService) {
  $scope.user  = accountService.getUser();
  $scope.games = gamesService.loadGames();

  $scope.newGame = function() {
    $location.path('/games/new').replace()
  };
}]);



