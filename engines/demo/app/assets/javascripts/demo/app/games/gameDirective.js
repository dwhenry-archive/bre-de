'use strict'

angular.module('demoApp')
  .directive('gameRowDetails', ['gamesService', function(gamesService) {
    var directive = {};

    directive.restrict = 'AE';
    directive.template = $('#gameDetail').html();

    directive.scope = {
      game: "=game",
      currentPlayer: "=currentPlayer"
    };

    directive.link = function(scope, elements, attr) {
      var joinGame = function(gameID) {
        gamesService.joinGame(gameID).then(function() {
          alert('join')
        });
      };

      var leaveGame = function(gameID) {
        gamesService.leaveGame(gameID).then(function() {
          alert('leave')
        });
      };

      scope.options = {
        actionName: scope.currentPlayer ? 'Leave' : 'Join',
        actionMethod: scope.currentPlayer ? leaveGame : joinGame
      }
    };

    return directive;
  }]);



