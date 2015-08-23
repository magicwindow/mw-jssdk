
var modules = {};
var moduleFans = {};

function Module(modName, action) {
  this.name = modName;
  this.action = action;
  modules[modName] = this;
  this.init();
}

Module.prototype = {

  init: function() {
    var fans = moduleFans;
    this.stats = 0;
    this.depsStats = {};
    this.fixAction();

    this.deps.forEach(function(dep) {
      fans[dep] = fans[dep] || {};
      fans[dep][this.name] = true;
    });

    this.instance = this.execute();
    this.notify();
  },

  fixAction: function() {
    var fixed,
        action = this.action,
        paramHolders = this.getFuncParamHolders(action);

    if (typeof action === 'function') {
      this.action = paramHolders.concat(action);
    }

    this.deps = this.action.length>1 ? this.action.slice(0, this.action.length) : [];
  },

  getFuncParamHolders: function(action) {
    var funcSource,
        exp,
        matched,
        serialParams;

    if (typeof action === 'function') {
      funcSource = action.toString();
      exp = /function\s*\w*\s*\((.*)\)\s*\{/;
      matched = funcSource.match(exp);

      if (matched) {
        serialParams = matched[1].replace(/\s*/, '');
        return serialParams.split(',');
      }
    } else if (action && action.constructor === Array) {
      return action.slice(0, action.length-1);
    }

  },

  execute: function () {
    var action = this.action,
        params = action.slice(0, action.length-1),
        func = action[action.length-1];

    params.forEach(function(param, i){
      var mod = modules[param];

      if (mod) {
        params[i] = mod.execute();
      }
    });

    if (!this.instance) {
      this.instance = func.apply(null, params);
      this.stats += 1;
    }

    return this.instance;
  },

  checkDeps: function() {
    var notCompleted = false;

    this.deps.forEach(function (dep) {
      var mod = modules[this.deps[dep]];
      if (!mod || mod.checkDeps() === false) {
        notCompleted = true;
      }
    });

    return !notCompleted;
  },

  notify: function() {
    var nm = this.name,
        fans = moduleFans[nm];

    if (fans && fans.length > 0) {
      fans.forEach(function(fan) {
        fan.complete(nm);
      });
    }
  },

  complete: function (dep) {
    var isAllCompleted = this.checkDeps();

    if (isAllCompleted) {
      this.stats += 1;
      this.execute();
    }
  }

};

/**
 * Magicwindow简单模块化，仅支持纯粹的代码模块化，暂不支持通过http加载JS模块；
 *
 * 示例：
 *     @example
 *          mw.module('ajax', [‘common’], function() {
 *
 *          });
 *
 * @member mw.module
 * @method
 */
mw.module = function(modName, action) {

  if (!action) {
    if (modules[modName]) {
      return modules[modName].execute();
    } else {
      throw new Error('Module not found: '+ modName);
    }
  } else {
    return new Module(modName, action);
  }
};

mw.module('m1', ['m2', 'm3', function(m2, m3) {
  console.log(m2, m3);

  return 'MODULE-1';
}]);

mw.module('m2', ['m3', function(m3) {
  console.log(m3);

  return 'MODULE-2';
}]);

mw.module('m3', [function() {
  console.log('M3 is loaded!');

  return 'MODULE-3';
}]);

var a = mw.module('m1');
