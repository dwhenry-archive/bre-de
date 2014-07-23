Utils = {
  findById: function(items, id) {
    return $.grep(items, function (item) {
      return item.id == id;
    })[0];
  }
};
