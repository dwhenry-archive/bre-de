
angular.module('demoApp')
.service('accountService',['$http', '$location', '$cookies', function($http, $location, $cookies) {

  var user = {
    email: $cookies.userEmail,
    name: $cookies.userName,
    token: $cookies.userToken,
    password: null, // should not really store this..
    loggedIn: $cookies.userToken !== undefined
  }

  this.getUser = function(logInOptional) {
    if(logInOptional || this.loggedIn()) {
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
      $cookies.userName = user.name = data.name;
      $cookies.userToken = user.token = data.auth_token;
      $cookies.userEmail = user.email = data.email;
      user.loggedIn = true
      $location.path('/games').replace();
    })
    .error(function(data, status, headers, config) {
      alert('fail')
    });
  };

}])



