if (typeof exports !== 'undefined') {
  var _ = require('underscore');
} else {
  // underscore should be loaded in the browser before
}

var fasoc = {

  /* ======================================================================== */
  /*                          attrGetterSetter                                */
  /* ======================================================================== */
  attrGetterSetter: function(context, attr, config) {
    config = config || {};
    var value = config.defaultValue;
    context[attr] = function(v) {
      if(_.isNumber(v) || _.isString(v) || !!v) {
        if(_.isFunction(config.accept)) {
          var accept = config.accept(v);
          if(accept !== true) {
            return accept;
          }
        }
        value = v;
        return context;
      }
      return value;
    };
  },
  
  /* ======================================================================== */
  /*                          listGetterSetter                                */
  /* ======================================================================== */
  listGetterSetter: function(context, attr, config) {
    config = config || {};
    var value = config.defaultValue || [];
    config.strategy = config.strategy || "push";
    context[attr] = function(v) {
      var args = Array.prototype.slice.call(arguments);
      if(_.isArray(args[0])) {
        if(_.isFunction(config.accept)) {
          var accept = config.accept(v);
          if(accept !== true) {
            return accept;
          }
        }
        value = v;
        return context;
      } else if(args.length > 0 && (_.isNumber(args[0]) || _.isString(args[0]) || !!args[0])) {
        for(var i = 0; i < args.length; i++) {
          var arg = args[i];
          if(_.isFunction(config.accept)) {
            var accept = config.accept(arg);
            if(accept !== true) {
              return accept;
            }
          }

          if(config.strategy === 'push') {
            value.push(arg);
          } else if(config.strategy === 'toggle') {
            if(_.contains(value, arg)) {
              var index = _.indexOf(value, arg);
              value.splice(index, 1);
            } else {
              value.push(arg);
            }
          }
        }
        return context;
      }
      return value;
    };
  },

  /* ======================================================================== */
  /*                          hashListGetterSetter                            */
  /* ======================================================================== */
  hashListGetterSetter: function(context, attr, config) {
    config = config || {};
    var value = config.defaultValue || [];
    config.strategy = config.strategy || 'push';
    var idAttr = config.attributes[0];

    var findInList = function(id) {
      var instances = _.filter(value, function(v) {
        return v[idAttr] === id;
      });
      if(instances.length === 1) {
        return instances[0];
      }
      if(instances.length === 0) {
        return false;
      }
      return instances;
    };

    var addNew = function(args) {
      if(_.isArray(args)) {
        var obj = {};
        var index = 0;
        _.each(config.attributes, function(attr) {
          obj[attr] = args[index++];
        });
        value.push(obj);
      } else if(_.isObject(args)) {
        value.push(args);
      }
    };

    var merge = function(obj, args) {
      if(_.isArray(args)) {
        var index = 0;
        _.each(config.attributes, function(attr) {
          obj[attr] = args[index++];
        });
      } else if(_.isObject(args)) {
        _.each(_.keys(args), function(key) {
          obj[key] = args[key];
        });
      }
    };

    context[attr] = function() {
      var args = Array.prototype.slice.call(arguments);
      if(args.length === 0) {
        return value;
      } else if(args.length === 1) {
        if(_.isArray(args[0])) {
          value = args[0];
          return context;
        } else if(_.isObject(args[0])) {
          var obj = findInList(args[0][idAttr]);
          if(obj) {
            if(config.strategy === 'push') {
              addNew(args[0]);
            } else if(config.strategy === 'replace') {
              merge(obj, args[0]);
            }
          } else {
            addNew(args[0]);
          }
          return context;
        } else if(_.isString(args[0])) {
          return findInList(args[0]);
        }
      } else {
        var obj = findInList(args[0]);
        if(obj) {
          if(config.strategy === 'push') {
            addNew(args);
          } else if(config.strategy === 'replace') {
            merge(obj, args);
          }
        } else {
          addNew(args);
        }
        return context;
      }
    }
  },
  
  /* ======================================================================== */
  /*                          hashGetterSetter                                */
  /* ======================================================================== */
  hashGetterSetter: function(context, attr, config) {
    config = config || {};
    var value = config.defaultValue || {};
    context[attr] = function(v) {
      var args = Array.prototype.slice.call(arguments);
      if(args.length === 0) {
        return value;
      } else if(args.length === 1) {
        return value[args[0]];
      }
      if(_.isFunction(config.accept)) {
        var accept = config.accept(args[1]);
        if(accept !== true) {
          return accept;
        }
      }
      value[args[0]] = args[1];
      return context;
    }
  }
};

if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = fasoc;
  }
  exports.fasoc = fasoc;
} else {
  window.fasoc = fasoc;
}