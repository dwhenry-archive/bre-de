// Taken from: https://gist.github.com/floatingmonkey/3384419
/* pubsub - based on https://github.com/phiggins42/bloody-jquery-plugins/blob/master/pubsub.js*/

'use strict';

angular.module("demoApp")
  .service('cbNotifier', ['cbPubSub', function (cbPubSub) {

    var options = {
      host: '0.0.0.0',
      ws_port: 8080,
      wss_port: 8080,
      key: '9f93d343467a26f15f77',
      channelName: 'CodeBreaker'
    };

    Pusher.host = options.host;
    Pusher.ws_port = options.ws_port;
    Pusher.wss_port = options.wss_port;

    var pusher = new Pusher(options.key);
    var channels = {};

    this.watch = function(eventName) {
      if(channels[eventName]) { return; }

      var channel = pusher.subscribe(options.channelName);
      channels[eventName] = channel;

      channel.bind(eventName, function (data) {
        cbPubSub.publish(eventName, data);
      });
    }
  }]);
