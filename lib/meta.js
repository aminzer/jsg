(function () {
    'use strict';

    // ======================================================================================
    //  meta.common
    //  common helpers
    // ======================================================================================

    var common = function () {
        var self = {};

        self.first_defined = function(/*...arguments*/) {
            for (var i = 0; i < arguments.length; i++) {
                if (_is_defined(arguments[i])) {
                    return arguments[i];
                }
            }
            return null;
        };

        self.is_object = _is_object;
        self.is_function = _is_function;
        self.is_array = _is_array;
        self.is_defined = _is_defined;
        self.is_undefined = _is_undefined;
        self.is_float = _is_float;
        self.is_int = _is_int;
        self.is_string = _is_string;
        self.is_boolean = _is_boolean;

        return self;
    }();

    // ======================================================================================
    //  meta.Class
    //  manipulating objects as prototype-based classes
    // ======================================================================================

    var Class = function () {
        var self = function (clazz) {
            _class = _is_function(clazz) ? clazz : function () {};
            return self;
        };

        var _class;

        var _configuration = function () {
            var self = {};
            var properties = {
                _parent_method_prefix: 'parent_',
                _property_accessors: true
            };

            Object.defineProperties(self, {
                parent_method_prefix: {
                    get: function () {
                        return properties._parent_method_prefix;
                    },
                    set: function (newParentMethodPrefix) {
                        properties._parent_method_prefix = '' + newParentMethodPrefix;
                    }
                },
                property_accessors: {
                    get: function () {
                        return properties._property_accessors;
                    },
                    set: function (property_accessors) {
                        properties._property_accessors = !!property_accessors;
                    }
                }
            });

            return self;
        }();

        self.config = _configuration;

        self.get_class = function () {
            return _class;
        };

        self.extend = function (baseClass) {
            _class.prototype = Object.create(baseClass.prototype);
            return self;
        };

        self.add_mixin = function (mixin) {
            _call_depend_on_param(_add_mixin, mixin);
            return self;
        };

        self.define_method = function (methodName, methodFunc) {
            if (_is_function(methodFunc)) {
                _define_method(methodName, methodFunc);
            } else {
                _call_depend_on_param(_define_method, arguments[0]);
            }
            return self;
        };

        self.override_method = function (methodName, methodFunc) {
            if (_is_function(methodFunc)) {
                _override_method(methodName, methodFunc);
            } else {
                _call_depend_on_param(_override_method, arguments[0]);
            }
            return self;
        };

        self.define_static_method = function (methodName, methodFunc) {
            if (_is_function(methodFunc)) {
                _define_static_method(methodName, methodFunc);
            } else {
                _call_depend_on_param(_define_static_method, arguments[0])
            }
            return self;
        };

        self.define_alias = function (aliasName, methodName) {
            _define_method(aliasName, _class.prototype[methodName]);
            return self;
        };

        self.define_reader = function (propertyName, methodFunc) {
            if (_is_function(methodFunc)) {
                _define_reader(propertyName, methodFunc);
            } else {
                _call_depend_on_param(_define_reader, arguments[0]);
            }
            return self;
        };

        self.define_writer = function (propertyName, methodFunc) {
            if (_is_function(methodFunc)) {
                _define_writer(propertyName, methodFunc);
            } else {
                _call_depend_on_param(_define_writer, arguments[0]);
            }
            return self;
        };

        self.define_accessors = function (propertyName, accessorsObject) {
            if (_is_object(accessorsObject)) {
                _define_reader(propertyName, accessorsObject.get);
                _define_writer(propertyName, accessorsObject.set);
            } else {
                _call_depend_on_param(_define_accessors, arguments[0]);
            }
            return self;
        };

        self.extend_from = self.extend;
        self.add_mixins = self.add_mixin;
        self.define_methods = self.define_method;
        self.define = self.define_method;
        self.override_methods = self.override_method;
        self.override = self.override_method;
        self.define_static_methods = self.define_static_method;
        self.define_static = self.define_static_method;
        self.define_readers = self.define_reader;
        self.define_writers = self.define_writer;

        function _add_mixin(mixin) {
            if (!mixin.prototype) return;
            Object.getOwnPropertyNames(mixin.prototype).forEach(function (key) {
                if (_is_function(mixin.prototype[key])) {
                    _class.prototype[key] = mixin.prototype[key];
                } else {
                    var property_descriptor = Object.getOwnPropertyDescriptor(mixin.prototype, key);
                    if (property_descriptor) {
                        Object.defineProperty(_class.prototype, key, property_descriptor);
                    }
                }
            });
        }

        function _define_method(methodName, methodFunc) {
            _class.prototype[methodName] = methodFunc;
        }

        function _override_method(methodName, methodFunc) {
            _class.prototype[_configuration.parent_method_prefix + methodName] = _class.prototype[methodName];
            _define_method(methodName, methodFunc);
        }

        function _define_static_method(methodName, methodFunc) {
            _class[methodName] = methodFunc;
        }

        function _define_accessors(propertyName) {
            _define_reader(propertyName);
            _define_writer(propertyName);
        }

        function _define_reader(propertyName, methodFunc) {
            var getter = _is_function(methodFunc) ? methodFunc : new Function('return this.' + _prop(propertyName));
            if (_configuration.property_accessors) {
                _update_property_descriptor(propertyName, {get: getter});
            } else {
                _class.prototype[_getter(propertyName)] = getter;
            }
        }

        function _define_writer(propertyName, methodFunc) {
            var setter = _is_function(methodFunc) ? methodFunc : new Function('newVal', 'this.' + _prop(propertyName) + '= newVal');
            if (_configuration.property_accessors) {
                _update_property_descriptor(propertyName, {set: setter});
            } else {
                _class.prototype[_setter(propertyName)] = setter;
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

        function _update_property_descriptor(propertyName, descriptorUpdates) {
            var descriptor = _get_property_descriptor(propertyName) || {configurable: true};
            for (var key in descriptorUpdates) {
                if (descriptorUpdates.hasOwnProperty(key)) {
                    descriptor[key] = descriptorUpdates[key];
                }
            }
            Object.defineProperty(_class.prototype, propertyName, descriptor);
        }

        function _get_property_descriptor(propertyName) {
            var clazz = _class.prototype;
            var descriptor;
            while (clazz) {
                descriptor = Object.getOwnPropertyDescriptor(clazz, propertyName);
                if (descriptor) {
                    return descriptor;
                }
                clazz = Object.getPrototypeOf(clazz);
            }
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

        return self;
    }();

    // ======================================================================================
    //  meta.Hash
    //  manipulating objects as hash arrays
    // ======================================================================================

    var Hash = function () {
        function Hash(hash) {
            this._hash = _is_object(hash) ? hash : {};
        }

        Hash.prototype.to_object = function () {
            return this._hash;
        };

        Hash.prototype.to_obj = Hash.prototype.to_object;

        Hash.prototype.add = function (key, value, overwrite) {
            overwrite = overwrite || false;
            if (_is_defined(value) && (overwrite || !this._hash.hasOwnProperty(key) || _is_undefined(this._hash[key]))) {
                this._hash[key] = value;
            }
            return this;
        };

        Hash.prototype.soft_add = Hash.prototype.add;

        Hash.prototype.hard_add = function (key, value) {
            return this.add(key, value, true);
        };

        Hash.prototype.merge = function (otherHash, overwrite) {
            overwrite = overwrite || false;
            for (var key in otherHash) {
                if (otherHash.hasOwnProperty(key) && _is_defined(otherHash[key])) {
                    this.add(key, otherHash[key], overwrite);
                }
            }
            return this;
        };

        Hash.prototype.soft_merge = Hash.prototype.merge;

        Hash.prototype.hard_merge = function(otherHash) {
            return this.merge(otherHash, true);
        };

        return Hash;
    }();

    // ======================================================================================
    //  MetaError
    // ======================================================================================

    function MetaError(message) {
        this.name = 'MetaError';
        this.message = message;
        this.stack = (new Error()).stack;
    }

    MetaError.prototype = Object.create(Error.prototype);

    // ======================================================================================

    function _is_object(something) {
        return something && (typeof something  === 'object');
    }

    function _is_array(something) {
        return Array.isArray(something);
    }

    function _is_function(something) {
        return typeof something === 'function';
    }

    function _is_undefined(something) {
        return typeof something === 'undefined';
    }

    function _is_defined(something) {
        return !_is_undefined(something);
    }

    function _is_int(something) {
        return !isNaN(parseInt(something)) && isFinite(something);
    }

    function _is_float(something) {
        return !isNaN(parseFloat(something)) && isFinite(something);
    }

    function _is_string(something) {
        return typeof something === 'string';
    }

    function _is_boolean(something) {
        return typeof something === 'boolean';
    }

    window.meta = window.meta || {};
    window.meta.common = common;
    window.meta.Class = Class;
    window.meta.Hash = Hash;
}());