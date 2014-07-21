
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

//    this.join = function (user, game) {
//      return $http({
//        method: 'PUT',
//        url: '/games/' + game.id,
//        data: {
//          name: user.name,
//          token: user.token
//        }
//      })
//        .then(
//        function (response) {
//          return response.data
//        },
//        function (response) {
//          alert('Something has gone wrong with the game.  Please try again.')
//          return {}
//        }
//      );
//    };

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

    var setGameData = function(filter, data) {
      if(gameData[filter]) {
        $.each(data, function(i, d) {
          gameData[filter][i] = d
        });
        gameData[filter].splice(data.length, gameData[filter].length)
        return gameData[filter];
      } else {
        return (gameData[filter] = data);
      }
    }

    var getGames = function(filter) {
      return $http({method: 'GET', url: '/games?filter=' + filter + '&email=' + user.email + '&token=' + user.token})
        .then(
        function(data, status, headers, config) {
          return setGameData(filter, data.data.games)
        },
        function(data, status, headers, config) {
          alert('fail');
          return [];
        });
    }
  }])



