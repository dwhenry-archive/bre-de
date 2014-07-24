Utils = {
  findById: function(items, id) {
    return $.grep(items, function (item) {
      return item.id == id;
    })[0];
  },

  findExceptById: function(items, id) {
    return $.grep(items, function (item) {
      return item.id != id;
    })
  },

  simpleClone: function(obj, overrides) {
    var target = {};
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        target[i] = overrides[i] || obj[i];
      }
    }
    return target;
  }
};
