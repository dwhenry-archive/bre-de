
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

    this.create = function(user, details) {
      return $http({
        method: 'POST',
        url: '/games',
        data: {
          name: user.name,
          token: user.token,
          max_player: details.players
        }
      })
      .then(
        function (response) {
          return response.data
        },
        function (response) {
          alert('Something has gone wrong with the game.  Please try again.')
          return []
        }
      );
    };

    this.join = function (user, game) {
      return $http({
        method: 'PUT',
        url: '/games/' + game.id,
        data: {
          name: user.name,
          token: user.token
        }
      })
        .then(
        function (response) {
          return response.data
        },
        function (response) {
          alert('Something has gone wrong with the game.  Please try again.')
          return {}
        }
      );
    };

    var getGames = function(filter, user) {
      return $http({method: 'GET', url: '/games?filter=' + filter + '&name=' + user.name + '&token=' + user.token})
      .then(
        function(response) {
          return response.data
        },
        function(response) {
          alert('Something has gone wrong with the game.  Please try again.')
          return []
        }
      );
    };


  }]);



