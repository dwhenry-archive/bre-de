//parts of underscore I want

_ = {}

_.memoize = function (func, hasher) {

  var memo = {};

  hasher || (hasher = _.identity);

  return function () {

    var key = hasher.apply(this, arguments);

    return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));

  };
};

_.identity = function (value) {
  return value;
};

_.has = function (obj, key) {
  return obj != null && hasOwnProperty.call(obj, key);
};
