'use strict'

angular.module('demoApp')
  .controller('joinGameController', ['$scope', '$location', '$route', 'accountService', 'gamesService', function($scope, $location, $route, accountService, gamesService) {
    var user = $scope.user = accountService.getUser();
    var game = {
      id: $route.current.params.id
    }
    $scope.action = "adding you to the game";

    gamesService.join(user, game.id).then(function (game) {
      $location.path('/games/' + game.id).replace();
    });

  }]);



