'use strict'

angular.module('demoApp')
  .controller('gamesController', ['$scope', '$location', 'accountService', function($scope, $location, accountService) {
    $scope.user = accountService.getUser();

    gamesService.waitingPLayers(user).then(function(games) {
      $scope.games = games;
    })

  }])



