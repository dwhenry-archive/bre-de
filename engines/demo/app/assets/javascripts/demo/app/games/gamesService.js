
angular.module('demoApp')
  .service('gamesService',['$http', function($http) {
    this.forUser = function(user) {
      return getGames('for', user);
    };

    this.waitingPlayers = function(user) {
      return getGames('waiting', user);
    };

    this.pendingGames = function(user) {
      return getGames('for', user);
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
      })
    }

    this.joinGame = function(gameID) {
      return $http({
        method: 'PUT',
        url: '/games/' + gameID,
        data: {
          command: 'add_player'
        }
      })
    }

    var getGames = function(filter, user) {
      return $http({method: 'GET', url: '/games?filter=' + filter + '&email=' + user.email + '&token=' + user.token})
        .then(
        function(data, status, headers, config) {
          return data.data;
        },
        function(data, status, headers, config) {
          alert('fail');
          return [];
        });
    }
  }])



