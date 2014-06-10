'use strict'

angular.module('demoApp')
  .controller('createGameController', ['$scope', '$location','accountService', 'gamesService', function ($scope, $location, accountService, gamesService) {
    var user = $scope.user = accountService.getUser();
    var details = $scope.details = {
      players: 4
    };

    $scope.create = function () {
      gamesService.create(user, details).then(function(game) {
        $location.path('#/games/' + game.id).replace();
      });
    }
  }]);



