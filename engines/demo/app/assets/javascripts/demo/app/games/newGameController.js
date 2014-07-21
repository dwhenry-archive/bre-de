'use strict'

angular.module('demoApp')
  .controller('newGameController', ['$scope', '$location', 'accountService', 'gamesService', function($scope, $location, accountService, gamesService) {
    var user = $scope.user = accountService.getUser();
    $scope.game = {
      max_player: 4
    }

    $scope.createGame = function() {
      gamesService.createGame(user, $scope.game.max_player).then(function(gameId) {
        $location.path('/games/' + gameId).replace()
      })
    }

    gamesService.pendingGames(user).then(function (data) {
      $scope.pendingGames = data.games;
    });

    gamesService.waitingPlayers(user).then(function(data) {
      $scope.games = data.games;
    });

  }])



