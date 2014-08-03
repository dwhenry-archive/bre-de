// Taken from: https://gist.github.com/floatingmonkey/3384419
/* pubsub - based on https://github.com/phiggins42/bloody-jquery-plugins/blob/master/pubsub.js*/

'use strict';

angular.module("demoApp")
.factory('cbPubSub', function () {
  var cache = {};
  var PubSub = {
    publish: function (topic, args) {
      args = args ? [args] : []
      if(cache[topic]) {
        var i, l = cache[topic].length;
        for(i=0; i<l; i++) {
          cache[topic][i].apply(null, args);
        }
      }
    },

    subscribe: function (topic, callback) {
      if (!cache[topic]) {
        cache[topic] = [];
      }
      cache[topic].push(callback);
      return [topic, callback];
    },

    unsubscribe: function (handle) {
      var topic = handle[0];
      if (cache[topic]) {
        var i, l = cache[topic].length;
        for (i = l-1; i >= 0; i--) {
          if (cache[topic][i] == handle[1]) {
            cache[topic].splice(i, 1);
          }
        }
      };
    }
  };

  return {
    publish: PubSub.publish,

    subscribe: function (topic, callback, scope) {
      var handle = PubSub.subscribe(topic, callback);

      if(scope) {
        var unbind = function () {
          PubSub.unsubscribe(handle);
        };
        scope.$on('$destroy', unbind);
      }

      return handle;
    },

    unsubscribe: PubSub.unsubscribe
  }
});
