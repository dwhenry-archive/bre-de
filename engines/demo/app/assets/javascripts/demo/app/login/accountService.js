
angular.module('demoApp')
.service('accountService',['$http', '$location', function($http, $location) {
  var user = {
    email: null,
    name: null,
    token: null,
    password: null, // should not really store this..
    loggedIn: false
  }

  this.getUser = function(loggingOptional) {
    if(loggingOptional || this.loggedIn()) {
      return user
    } else {
      $location.path('/').replace();
    }
  };

  this.loggedIn = function() {
    return !!user.loggedIn;
  }

  this.login = function() {
    $http({method: 'GET', url: '/login?email=' + user.email + '&password=' + user.password})
    .success(function(data, status, headers, config) {
      user.name = data.name;
      user.token = data.token;
      user.loggedIn = true
      $location.path('/games').replace();
    })
    .error(function(data, status, headers, config) {
      alert('fail')
    });
  };

}])



