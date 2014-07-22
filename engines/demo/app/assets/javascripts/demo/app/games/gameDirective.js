'use strict'

angular.module('demoApp')
  .directive('cbGameRow', ['gamesService', function(gamesService) {
    var directive = {};

    directive.restrict = 'AE';
    directive.template = $('#gameRowDetail').html();

    directive.scope = {
      game: "=game",
      currentPlayer: "=currentPlayer"
    };

    directive.link = function(scope, elements, attr) {

      var game = scope.game;
      var joinGame = function() {
        gamesService.joinGame(game.id);
      };

      var leaveGame = function() {
        gamesService.leaveGame(game.id);
      };

      scope.options = {
        actionName: scope.currentPlayer ? 'Leave' : 'Join',
        actionMethod: scope.currentPlayer ? leaveGame : joinGame
      }
    };

    return directive;
  }])
  .directive('cbGamesTable', ['gamesService', 'accountService', function(gamesService, accountService) {
    var user = accountService.getUser();
    var directive = {};

    directive.restrict = 'AE';
    directive.template = $('#gamesTableDetail').html();

    directive.scope = {
      games: "=games"
    };

    directive.link = function(scope, elements, attr) {

      scope.currentPlayer = function(gameID) {
        var game = scope.games.filter(function(game) {
          return (game.id == gameID);
        })[0];

        var player = game.players.filter(function(player) {
          return player.id == user.id
        })[0];

        return player !== undefined
      };
    };

    return directive;
  }]);
