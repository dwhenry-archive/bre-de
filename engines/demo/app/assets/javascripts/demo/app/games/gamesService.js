
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
      // this is wrong.. just to display change on screen.. fix once everything else works
      findGame(gameID).players.push({id: user.id, name: user.name, status: 'pending'});

      return putAction(gameID, 'leave_game')
      .then(this.loadGames)
    };

    this.joinGame = function(gameID) {
      findGame(gameID).players.push({id: user.id, name: user.name, status: 'pending'});

      return putAction(gameID, 'add_player')
      .then(this.loadGames)
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

    function findGame(gameID) {
      var desiredGame, i, l = games.length, game;
      for(i=0; i < l; i++) {
        game = games[i];
        if(game.id == gameID) {
          desiredGame = game;
          break;
        }
      };
      return desiredGame;
    }
  }]);



