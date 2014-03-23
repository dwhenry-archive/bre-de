
angular.module('demoApp')
.service('accountService',['$http', '$location', function($http, $location) {
  var user = {
    email: null,
    name: null,
    auth_token: null,
    password: null // should not really store this..
  }

  this.getUser = function() {
    return user
  };

  this.login = function() {
    $http({method: 'GET', url: '/login?email=' + user.email + '&password=' + user.password})
    .success(function(data, status, headers, config) {
      user.name = data.name;
      user.token = data.token;
      $location.path('/games').replace();
    })
    .error(function(data, status, headers, config) {
      alert('fail')
    });
  };
}])



