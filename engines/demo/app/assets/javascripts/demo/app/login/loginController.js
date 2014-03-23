'use strict'

angular.module('demoApp')
.controller('loginController', ['$scope', 'accountService', function($scope, accountService) {
  $scope.user = accountService.getUser();
  $scope.login = function() {
    accountService.login()
  }
}])



