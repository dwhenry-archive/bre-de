
angular.module('demoApp')
  .service('gamesService',['$http', 'accountService', 'cbUtils', 'cbPubSub', function($http, accountService, cbUtils, cbPubSub) {
    var user = accountService.getUser();
    var games = [];

    var self = this;

    cbPubSub.subscribe('gameUpdate', function(data) {
      if(data.newGame) {
        self.loadGames();
        console.log('new Game')
        return;
      }

      var i, l = games.length;
      for(i=0; i < l; i++) {
        if(games[i].id == data.id) {
          self.loadGames();
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
      return putAction(gameID, 'leave_game')
    };

    this.joinGame = function(gameID) {
      return putAction(gameID, 'add_player')
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



