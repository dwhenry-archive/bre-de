'use strict'

angular.module('demoFilters', [])
  .filter('inCurrentGame', ['accountService', function (accountService) {
    var user = accountService.getUser();

    return _.memoize(
      function (games) {
        return $.grep(games, function (game) {
          return !!Utils.findById(game.players, user.id)
        })
      }, keys
    )
  }])
  .filter('canJoinGame', ['accountService', function (accountService) {
    var user = accountService.getUser();

    return _.memoize(
      function (games) {
        return $.grep(games, function (game) {
          return !Utils.findById(game.players, user.id)
        })
      }, keys
    )
  }]);

function keys(games) {
  var res = [], player_ids;
  $.each(games, function(i, game) {
    player_ids = [];
    $.each(game.players, function(i, player) {
      player_ids.push(player.id)
    });
    res.push({game: game.id, players: player_ids})
  });
  return JSON.stringify(res)
}
