'use strict'

angular.module('demoApp')
  .directive('gameRowDetails', ['gamesService', function(gamesService) {
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
        gamesService.joinGame(game.id).then(function() {
          scope.$emit('addGame', {game: game})
        });
      };

      var leaveGame = function() {
        gamesService.leaveGame(game.id).then(function() {
          scope.$emit('removeGame', {game: game})
        });
      };

      scope.options = {
        actionName: scope.currentPlayer ? 'Leave' : 'Join',
        actionMethod: scope.currentPlayer ? leaveGame : joinGame
      }
    };

    return directive;
  }])
  .directive('pendingGamesTableDetails', ['gamesService', 'accountService', function(gamesService, accountService) {
    var directive = gamesTableDetails(gamesService, accountService);
//    directive.require = '^gamesTableDetails';
    directive.restrict = 'AE';
    directive.link = function(scope, elements, attr) {
      directive.linkAction(scope);

      scope.$on('addGame', function(opt) {
        scope.games.push(opt.targetScope.game);
//        scope.$apply()
      });
      scope.$on('removeGame', function(opt) {
        scope.games.splice(scope.games.indexOf(opt.targetScope.game), 1)
//        scope.$apply()
      });
    };
    return directive;
  }])
  .directive('currentGamesTableDetails', ['gamesService', 'accountService', function(gamesService, accountService) {
    var directive = gamesTableDetails(gamesService, accountService);
//    directive.require = '^gamesTableDetails';
    directive.restrict = 'AE';

    directive.link = function(scope, element, attr) {
      directive.linkAction(scope);

      scope.$on('addGame', function(opt) {
//        scope.games.push(opt.targetScope.game)
//        scope.$apply()
      });
      scope.$on('removeGame', function (opt) {
        var game = opt.targetScope.game;
        if (game.players.count > 1)
          scope.games.push(opt.targetScope.game)
      });
    };
    return directive;
  }]);

var gamesTableDetails = function(gamesService, accountService) {
  var user = accountService.getUser();
  var directive = {};

  directive.restrict = 'AE';
  directive.template = $('#gamesTableDetail').html();

  directive.scope = {
    games: "=games"
  };

  directive.linkAction = function(scope, elements, attr) {

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
}


