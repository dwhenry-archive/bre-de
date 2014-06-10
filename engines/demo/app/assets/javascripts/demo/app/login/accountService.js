
angular.module('demoApp')
.service('accountService',['$http', '$location', '$cookies', function($http, $location, $cookies) {

  var user = {
    email: $cookies.userEmail,
    name: $cookies.userName,
    token: $cookies.userToken
  }

  this.getUser = function(logInOptional) {
    if(logInOptional || this.loggedIn()) {
      return user
    } else {
      $location.path('/').replace();
    }
  };

  this.loggedIn = function() {
    return $cookies.userToken !== undefined;
  };

  this.logout = function() {
    delete $cookies["userToken"]
    user.token = undefined
  };

  this.login = function() {
    return $http({method: 'GET', url: '/login?email=' + user.email + '&password=' + user.password})
    .then(
      function(response) {
        if(response.data.auth_token === undefined) {
          return false;
        }
        $cookies.userName = user.name = response.data.name;
        $cookies.userToken = user.token = response.data.auth_token;
        $cookies.userEmail = user.email = response.data.email;
        user.loggedIn = true
        return true;
      },
      function(response) {
        return false;
      }
    );
  };

}])



