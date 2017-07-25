(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
	typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
	(factory((global['ref-decorator-component'] = {}),global.React));
}(this, (function (exports,React) { 'use strict';

React = React && React.hasOwnProperty('default') ? React['default'] : React;

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

/**
 * 通过react高阶组件取到子组件的引用
 * @param {React Component} ChildComponent
 * @param {object} refer
 */
function refComponentHoc(ChildComponent, refer) {
  return function (_React$Component) {
    inherits(RefComponent, _React$Component);

    function RefComponent(props) {
      classCallCheck(this, RefComponent);

      var _this = possibleConstructorReturn(this, (RefComponent.__proto__ || Object.getPrototypeOf(RefComponent)).call(this, props));

      _this._setRef = _this.setRef.bind(_this);
      return _this;
    }

    createClass(RefComponent, [{
      key: 'setRef',
      value: function setRef(childComponentInstance) {
        if (refer) {
          refer['ref'] = childComponentInstance;
        }
        this[ChildComponent.name] = childComponentInstance;
      }
    }, {
      key: 'render',
      value: function render() {
        var props = _extends({}, this.props, { ref: this._setRef });
        return React.createElement(ChildComponent, props);
      }
    }]);
    return RefComponent;
  }(React.Component);
}

function uuid() {
  var s = [];
  var hexDigits = '0123456789abcdef';
  var stamp = (+new Date() + '').slice(-5);
  for (var i = 0; i < 10; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1) + stamp;
  }
  return s.join('');
}

/**
 * 通过getRef方法取到wrappedComponent的实例
 * @param {array} decorators
 * @param {React Component} wrappedComponent
 */
function refDecoratorComponent(decorators, wrappedComponent) {
  var refer = new Proxy({ id: '' }, {
    get: function get$$1(target, key, receiver) {
      if (key === 'id') {
        var value = target['id'];
        target['id'] = '';
        return value;
      }
      return target[key];
    },
    set: function set$$1(target, key, value, receiver) {
      key = uuid();
      target['id'] = key;
      target[key] = value;
      return true;
    }
  });
  var refComponent = refComponentHoc(wrappedComponent, refer);
  var ResultComponent = decorators.reduce(function (prev, next) {
    return next(prev);
  }, refComponent);

  return function (_React$Component2) {
    inherits(RefComponentWrapper, _React$Component2);

    function RefComponentWrapper(props) {
      classCallCheck(this, RefComponentWrapper);

      var _this2 = possibleConstructorReturn(this, (RefComponentWrapper.__proto__ || Object.getPrototypeOf(RefComponentWrapper)).call(this, props));

      _this2._getRef = _this2.getRef.bind(_this2);
      return _this2;
    }

    createClass(RefComponentWrapper, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        !this._refId && (this._refId = refer['id']);
      }
    }, {
      key: 'getRef',
      value: function getRef() {
        return refer[this._refId];
      }
    }, {
      key: 'render',
      value: function render() {
        var props = _extends({}, this.props);
        return React.createElement(ResultComponent, props);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        refer[this._refId] = null;
        this._refId = null;
      }
    }]);
    return RefComponentWrapper;
  }(React.Component);
}

exports.refComponentHoc = refComponentHoc;
exports['default'] = refDecoratorComponent;

Object.defineProperty(exports, '__esModule', { value: true });

})));
