
(function () {
  'use strict';

  describe('Service: cbPubSub', function () {
    var counter, handle;
    beforeEach(module('demoApp'));

    beforeEach(inject(function(cbPubSub) {
      counter = 0;
      handle = cbPubSub.subscribe('newEvent', function () { counter += 1; });
    }));

    afterEach(inject(function (cbPubSub) {
      cbPubSub.unsubscribe(handle)
    }));

    it('publishing a message delegates to the subscribed methods', inject(function (cbPubSub) {
      cbPubSub.publish('newEvent');
      expect(counter).toEqual(1);
    }));

    it('subscribers will only receive messages they subscribe to', inject(function (cbPubSub) {
      cbPubSub.publish('otherEvent');
      expect(counter).toEqual(0);
    }));

    it('can have multiple methods for the same event', inject(function (cbPubSub) {
      var other_handle = cbPubSub.subscribe('newEvent', function () { counter += 1; });

      cbPubSub.publish('newEvent');
      expect(counter).toEqual(2);

      cbPubSub.unsubscribe(other_handle);
    }));

    it('you can unsubscribe a single event', inject(function (cbPubSub) {
      var other_handle = cbPubSub.subscribe('newEvent', function () { counter += 1; });

      cbPubSub.publish('newEvent');
      cbPubSub.unsubscribe(other_handle);
      cbPubSub.publish('newEvent');

      expect(counter).toEqual(3);
    }));

    it('event is automatically unsubscribed when scope is destroyed', inject(function (cbPubSub, $rootScope) {
      var scope = $rootScope.$new();
      cbPubSub.subscribe('newEvent', function () { counter += 1; }, scope);

      cbPubSub.publish('newEvent');
      expect(counter).toEqual(2);

      scope.$destroy();
      cbPubSub.publish('newEvent');
      expect(counter).toEqual(3);
    }));

  });
})();
