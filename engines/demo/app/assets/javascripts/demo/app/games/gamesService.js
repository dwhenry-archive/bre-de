
angular.module('demoApp')
  .service('gamesService',['$http', 'accountService', function($http, accountService) {
    var user = accountService.getUser();
    var gameData = {

    };

    this.forUser = function() {
      return getGames('for');
    };

    this.waitingPlayers = function() {
      return getGames('waiting');
    };

    this.pendingGames = function() {
      return getGames('for');
    };

    this.createGame = function(user, maxPlayers) {
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
          if(response.data.status === 'success')
            return response.data.game_id
          else {
            alert("Something has gone wrong\n\nStatus: " + data.status + "\nErrors: " + data.errors)
            return []
          }
        },
        function (response) {
          alert('Something has gone wrong with the game.  Please try again.')
          return []
        }
      );
    };

    this.leaveGame = function(gameID) {
      return $http({
        method: 'PUT',
        url: '/games/' + gameID,
        data: {
          command: 'leave_game'
        }
      }).then(function () {
        getGames('for');
        getGames('waiting');
      })
    }

    this.joinGame = function(gameID) {
      return $http({
        method: 'PUT',
        url: '/games/' + gameID,
        data: {
          command: 'add_player'
        }
      }).then(function() {
        getGames('for');
        getGames('waiting');
      })
    }

    var getGames = function(filter) {
      return $http({method: 'GET', url: '/games?filter=' + filter + '&email=' + user.email + '&token=' + user.token})
        .then(
        function(data, status, headers, config) {
          if(gameData[filter]){
            var games = gameData[filter].games
            games.length = 0;
            Array.prototype.push.apply(games, data.data.games);
          } else {
            gameData[filter] = data.data;
          }
          return gameData[filter];
        },
        function(data, status, headers, config) {
          alert('fail');
          return { filter : []};
        });
    }
  }])



