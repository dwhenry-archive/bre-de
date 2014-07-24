
angular.module('demoApp')
  .service('gamesService',['$http', 'accountService', function($http, accountService) {
    var user = accountService.getUser();
    var games = [];

    this.loadGames = function() {
      $http({method: 'GET', url: '/games?email=' + user.email + '&token=' + user.token})
        .then(
        function (data, status, headers, config) {
          games.length = 0;
          Array.prototype.push.apply(games, data.data.games);
        }
      );
      return games;
    };

    this.createGame = function(maxPlayers) {
      return $http({
        method: 'POST',
        url: '/games',
        data: {
          name: user.name,
          token: user.token,
          max_player: maxPlayers
        }
      })
      .then(
        function (response) {
          return response.data.game_id;
        },
        function (response) {
          alert('Something has gone wrong with the game.  Please try again.')
          return []
        }
      );
    };

    this.leaveGame = function(gameID) {
      var game = Utils.findById(games, gameID);
      var stats = game.stats.replace(/\((\d+) /, function (m, m1) {
        return '(' + (parseInt(m1) - 1) + ' '
      });

      var newGame = Utils.simpleClone(game, {players: Utils.findExceptById(game.players, user.id), stats: stats});
      games[games.indexOf(game)] = newGame;

      return putAction(gameID, 'leave_game')
      .then(this.loadGameWithDelay)
    };

    this.joinGame = function(gameID) {
      var game = Utils.findById(games, gameID);
      var stats = game.stats.replace(/\((\d+) /, function (m, m1) {
        return '(' + (parseInt(m1) + 1) + ' '
      });

      var newUser = {id: user.id, name: user.name, status: 'pending'}
      var newGame = Utils.simpleClone(game, {players: [newUser].concat(game.players), stats: stats});
      games[games.indexOf(game)] = newGame;

      return putAction(gameID, 'add_player')
      .then(this.loadGameWithDelay)
    };

    var gameloader;
    var local = this;
    this.loadGameWithDelay = function() {
      if(gameloader) gameloader.clearTimeout();
      gameloader = setTimeout(function() {
        gameloader = null;
        local.loadGames()
      }, 1000)
    };

    function putAction(gameID, action) {
      return $http({
        method: 'PUT',
        url: '/games/' + gameID,
        data: {
          command: action
        }
      })
    }
  }]);



