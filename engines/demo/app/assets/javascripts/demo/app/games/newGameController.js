'use strict'

angular.module('demoApp')
  .controller('newGameController', ['$scope', 'accountService', 'gamesService', function($scope, accountService, gamesService) {
    var user = $scope.user = accountService.getUser();

    gamesService.waitingPlayers(user).then(function(games) {
      $scope.games = games;
    });
  }]);



