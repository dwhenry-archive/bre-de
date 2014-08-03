
angular.module('demoApp')
  .service('gamesService',['$http', 'accountService', 'cbUtils', 'cbPubSub', function($http, accountService, cbUtils, cbPubSub) {
    var user = accountService.getUser();
    var games = [];

    var self = this;

    cbPubSub.subscribe('gameUpdate', function(data) {
      if(data.newGame) {
        self.loadGameWithDelay();
        console.log('new Game')
        return;
      }

      var i, l = games.length;
      for(i=0; i < l; i++) {
        if(games[i].id == data.id) {
          self.loadGameWithDelay();
          console.log('matching game ID')
          return;
        }
      }
      console.log('nothing happening here')
    });

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
      var game = cbUtils.findById(games, gameID);
      var stats = game.stats.replace(/\((\d+) /, function (m, m1) {
        return '(' + (parseInt(m1) - 1) + ' '
      });

      var newGame = cbUtils.simpleClone(game, {
        players: cbUtils.findExceptById(game.players, user.id),
        stats: stats
      });
      games[games.indexOf(game)] = newGame;

      return putAction(gameID, 'leave_game')
    };

    this.joinGame = function(gameID) {
      var game = cbUtils.findById(games, gameID);
      var stats = game.stats.replace(/\((\d+) /, function (m, m1) {
        return '(' + (parseInt(m1) + 1) + ' '
      });

      var newUser = {id: user.id, name: user.name, status: 'pending'}
      var newGame = cbUtils.simpleClone(game, {
        players: [newUser].concat(game.players),
        stats: stats
      });
      games[games.indexOf(game)] = newGame;

      return putAction(gameID, 'add_player')
    };

    var gameloader;
    var local = this;
    this.loadGameWithDelay = function() {
      gameloader && gameloader.clearTimeout();
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



