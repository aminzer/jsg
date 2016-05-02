/**
 * meta.Class - simple module created for easy manipulating with object prototypes
 */

'use strict';

window.meta = window.meta || {};

(function () {

    var Class = function (clazz) {
        _class = clazz;
        return Class;
    };

    var _class;

    var PARENT_PREFIX = 'parentMethod_';

    Class.get_class = function () {
        return _class;
    };

    Class.extend = function (baseClass) {
        _class.prototype = Object.create(baseClass.prototype);
        return Class;
    };

    Class.add_mixin = function (mixin) {
        _call_depend_on_param(_add_mixin, mixin);
        return Class;
    };

    Class.define_method = function (methodName, methodFunc, saveParent) {
        if (arguments.length == 1 && _is_object(arguments[0])) {
            _call_depend_on_param(_define_method, arguments[0]);
        } else {
            _define_method(methodName, methodFunc, saveParent);
        }
        return Class;
    };

    Class.define_reader = function (propertyName, methodFunc) {
        if (_is_function(methodFunc)) {
            _define_reader(propertyName, methodFunc);
        } else {
            _call_depend_on_param(_define_reader, propertyName);
        }
        return Class;
    };

    Class.define_writer = function (propertyName) {
        _call_depend_on_param(_define_writer, propertyName);
        return Class;
    };

    Class.define_accessors = function (propertyName) {
        _call_depend_on_param(_define_accessors, propertyName);
        return Class;
    };

    Class.extend_from = Class.extend;
    Class.add_mixins = Class.add_mixin;
    Class.define_methods = Class.define_method;
    Class.define = Class.define_method;
    Class.define_readers = Class.define_reader;
    Class.define_writers = Class.define_writer;

    function _add_mixin(mixin) {
        if (!mixin.prototype) return;
        for (var method in mixin.prototype) {
            if (!mixin.prototype.hasOwnProperty(method)) continue;
            _class.prototype[method] = mixin.prototype[method];
        }
    }

    function _define_method(methodName, methodFunc, saveParent) {
        if (saveParent === true) {
            _class.prototype[PARENT_PREFIX + methodName] = _class.prototype[methodName];
        }
        _class.prototype[methodName] = methodFunc;
    }

    function _define_accessors(propertyName) {
        _define_reader(propertyName);
        _define_writer(propertyName);
    }

    function _define_reader(propertyName, methodFunc) {
        if (_is_function(methodFunc)) {
            _class.prototype[_getter(propertyName)] = methodFunc;
        } else {
            _class.prototype[_getter(propertyName)] = new Function('return this.' + _prop(propertyName) + ';');
        }
    }

    function _define_writer(propertyName, methodFunc) {
        if (_is_function(methodFunc)) {
            _class.prototype[_setter(propertyName)] = methodFunc;
        } else {
            _class.prototype[_setter(propertyName)] = new Function('newVal', 'this.' + _prop(propertyName) + ' = newVal;');
        }
    }

    function _call_depend_on_param(callback, param) {
        if (_is_array(param)) {
            param.forEach(function (single_param) {
                callback.call(this, single_param);
            }, this);
        } else if (_is_object(param)) {
            for (var key in param) {
                if (!param.hasOwnProperty(key)) continue;
                callback.call(this, key, param[key]);
            }
        } else {
            callback.call(this, param);
        }
    }

    function _is_object(something) {
        return something && (typeof something  === 'object');
    }

    function _is_array(something) {
        return Array.isArray(something);
    }

    function _is_function(something) {
        return typeof something === 'function';
    }

    function _capitalize_first(str) {
        return str[0].toUpperCase() + str.slice(1);
    }

    function _prop(name) {
        return '_' + name;
    }

    function _getter(name) {
        return 'get' + _capitalize_first(name);
    }

    function _setter(name) {
        return 'set' + _capitalize_first(name);
    }

    meta.Class = Class;
}());