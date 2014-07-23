'use strict'

angular.module('demoApp')
  .controller('newGameController', ['$scope', '$location', 'accountService', 'gamesService', function($scope, $location, accountService, gamesService) {
    $scope.user = accountService.getUser();
    $scope.games = gamesService.loadGames();

    $scope.game = {
      max_player: 4
    }

    $scope.createGame = function() {
      gamesService.createGame($scope.game.max_player).then(function(gameId) {
        $location.path('/games/' + gameId).replace()
      })
    }
  }])



