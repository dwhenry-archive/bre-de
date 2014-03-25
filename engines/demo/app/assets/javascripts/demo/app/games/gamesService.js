
angular.module('demoApp')
  .service('gamesService',['$http', function($http) {
    this.forUser = function(user) {
      return getGames('for')
    };

    this.waitingPlayers = function(user) {
      return getGames('pendingPlayers')
    }

    this.create = function(user, maxPlayers) {

    }

    var getGames = function(filter) {
      return $http({method: 'GET', url: '/games?filter=' + filter + '&email=' + user.email + '&token=' + user.token})
        .success(function(data, status, headers, config) {
          return data
        })
        .error(function(data, status, headers, config) {
          alert('fail')
          return []
        });

    }


  }])



