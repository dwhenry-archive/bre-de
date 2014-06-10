'use strict'

angular.module('demoApp')
  .controller('logoutController', ['$scope', 'accountService', '$location', function ($scope, accountService, $location) {
    accountService.logout()

    $location.path('/').replace();
  }])



