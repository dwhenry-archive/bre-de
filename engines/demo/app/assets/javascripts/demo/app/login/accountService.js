
angular.module('demoApp')
.service('accountService',['$http', '$location', '$cookies', function($http, $location, $cookies) {

  var user = {
    id: $cookies.demoUserID,
    email: $cookies.demoUserEmail,
    name: $cookies.demoUserName,
    token: $cookies.demoUserToken
  }

  var cookies = this.$cookies = $cookies
//  this.$watch('$cokkies.userToken', function() {
//    user.email = $cookies.userEmail;
//    user.name = $cookies.userName;
//    user.token =  $cookies.userToken;
//  })

  this.getUser = function(logInOptional) {
    if(logInOptional || this.loggedIn()) {
      return user
    } else {
      $location.path('/').replace();
    }
  };

  this.loggedIn = function() {
    return $cookies.demoUserToken !== undefined;
  };

  this.logout = function() {
    delete $cookies["demoUserToken"]
    user.token = undefined
    return $http({method: 'GET', url: '/logout'})
  };

  this.login = function(user) {
    return $http({method: 'GET', url: '/login?email=' + user.email + '&password=' + user.password})
    .then(
      function(response) {
        if(response.data.auth_token === undefined) {
          return false;
        }
        cookies.demoUserID = user.id = '' + response.data.id;
        cookies.demoUserName = user.name = response.data.name;
        cookies.demoUserToken = user.token = response.data.auth_token;
        cookies.demoUserEmail = user.email = response.data.email;
        user.loggedIn = true
        return true;
      },
      function(response) {
        return false;
      }
    );
  };

  this.create = function(user) {
    return $http({method: 'POST', url: '/signup', data: {user: user, authenticity_token: "aEKCSuZuZtR3D8ajQJjAxrzCdz9DXD/QqN7VAOMMvmU="}})
      .then(
      function (response) {
        if (response.data.auth_token === undefined) {
          return false;
        }
        cookies.demoUserID = user.id = response.data.id;
        cookies.demoUserName = user.name = response.data.name;
        cookies.demoUserToken = user.token = response.data.auth_token;
        cookies.demoUserEmail = user.email = response.data.email;
        user.loggedIn = true
        return true;
      },
      function (response) {
        return false;
      }
    );

  }

}])



