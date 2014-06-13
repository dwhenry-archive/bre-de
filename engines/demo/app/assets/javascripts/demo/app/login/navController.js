'use strict'

angular.module('demoApp')
.controller('navController', ['$scope', 'accountService', function($scope, accountService) {
  $scope.accountService = accountService;
  $scope.loggedIn = accountService.loggedIn();

  $scope.$watch('accountService.loggedIn()', function (newVal, _, scope) {
    scope.loggedIn = newVal;
  });
}]);



