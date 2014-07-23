'use strict'

angular.module('demoFilters', [])
  .filter('inCurrentGame', ['accountService', function (accountService) {
    var user = accountService.getUser();

    return _.memoize(
      function (games) {
        return $.grep(games, function (game) {
          return !!Utils.findById(game.players, user.id)
        })
      }, JSON.stringify
    )
  }])
  .filter('canJoinGame', ['accountService', function (accountService) {
    var user = accountService.getUser();

    return _.memoize(
      function (games) {
        return $.grep(games, function (game) {
          return !Utils.findById(game.players, user.id)
        })
      }, JSON.stringify
    )
  }]);
