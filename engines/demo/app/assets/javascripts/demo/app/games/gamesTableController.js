'use strict'

angular.module('demoApp')
  .controller('gamesTableController', ['$scope', '$location', 'accountService', 'gamesService', function($scope, $location, accountService, gamesService) {
    var user = $scope.user  = accountService.getUser();

    $scope.currentPlayer = function(games, gameID) {
      var game = games.filter(function(game) {
        return (game.id == gameID);
      })[0]

      var player = game.players.filter(function(player) {
        return player.id == user.id
      })[0];

      return player !== undefined
    };

//    $scope.joinGame = function(gameID) {
//      gamesService.joinGame(gameID).then(function() {
//        loadGames($scope);
//      });
//
//    };
//
//    $scope.leaveGame = function(gameID) {
//      gamesService.leaveGame(gameID).then(function() {
//        loadGames($scope);
//      });
//    };
  }]);



