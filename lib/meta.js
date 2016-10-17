(function () {
    'use strict';

    // ======================================================================================
    //  meta.common
    //  common helpers
    // ======================================================================================

    var common = function () {
        var self = {};

        self.first_defined = function (/*...arguments*/) {
            for (var i = 0; i < arguments.length; i++) {
                if (_is_defined(arguments[i])) {
                    return arguments[i];
                }
            }
            return null;
        };

        self.has_method = function (obj, methodName) {
            return (_is_object(obj) || _is_function(obj)) && (methodName in obj) && _is_function(obj[methodName]);
        };

        self.is_object = _is_object;
        self.is_function = _is_function;
        self.is_array = _is_array;
        self.is_defined = _is_defined;
        self.is_undefined = _is_undefined;
        self.is_number = _is_number;
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
            this._class = _is_function(clazz) ? clazz : new Function();
        };

        var _configuration = function () {
            var _properties = {
                _parent_method_prefix: 'parent_',
                _property_accessors: true
            };

            return Object.defineProperties({}, {
                parent_method_prefix: {
                    get: function () { return _properties._parent_method_prefix },
                    set: function (newValue) { _properties._parent_method_prefix = '' + newValue }
                },
                property_accessors: {
                    get: function () { return _properties._property_accessors },
                    set: function (property_accessors) { _properties._property_accessors = !!property_accessors }
                }
            });
        }();

        self.config = _configuration;

        self.prototype.to_function = function () {
            return this._class;
        };

        self.prototype.to_f = self.prototype.to_function;

        self.prototype.extend = function (baseClass) {
            this._class.prototype = Object.create(baseClass.prototype);
            return this;
        };

        self.prototype.add_mixin = function (mixin) {
            _call_depend_on_param.call(this, _add_mixin, mixin);
            return this;
        };

        self.prototype.define_method = function (methodName, methodFunc) {
            if (_is_function(methodFunc)) {
                _define_method.call(this, methodName, methodFunc);
            } else {
                _call_depend_on_param.call(this, _define_method, arguments[0]);
            }
            return this;
        };

        self.prototype.override_method = function (methodName, methodFunc) {
            if (_is_function(methodFunc)) {
                _override_method.call(this, methodName, methodFunc);
            } else {
                _call_depend_on_param.call(this, _override_method, arguments[0]);
            }
            return this;
        };

        self.prototype.define_static_method = function (methodName, methodFunc) {
            if (_is_function(methodFunc)) {
                _define_static_method.call(this, methodName, methodFunc);
            } else {
                _call_depend_on_param.call(this, _define_static_method, arguments[0])
            }
            return this;
        };

        self.prototype.define_static_property = function (propertyName, descriptor) {
            Object.defineProperty(this._class, propertyName, descriptor);
            return this;
        };

        self.prototype.define_alias = function (aliasName, methodName) {
            _define_method.call(this, aliasName, this._class.prototype[methodName]);
            return this;
        };

        self.prototype.define_reader = function (propertyName, methodFunc) {
            if (_is_function(methodFunc)) {
                _define_reader.call(this, propertyName, methodFunc);
            } else {
                _call_depend_on_param.call(this, _define_reader, arguments[0]);
            }
            return this;
        };

        self.prototype.define_writer = function (propertyName, methodFunc) {
            if (_is_function(methodFunc)) {
                _define_writer.call(this, propertyName, methodFunc);
            } else {
                _call_depend_on_param.call(this, _define_writer, arguments[0]);
            }
            return this;
        };

        self.prototype.define_accessors = function (propertyName, accessorsObject) {
            if (_is_object(accessorsObject)) {
                _define_reader.call(this, propertyName, accessorsObject.get);
                _define_writer.call(this, propertyName, accessorsObject.set);
            } else {
                _call_depend_on_param.call(this, _define_accessors, arguments[0]);
            }
            return this;
        };

        self.prototype.extend_from = self.prototype.extend;
        self.prototype.add_mixins = self.prototype.add_mixin;
        self.prototype.define_methods = self.prototype.define_method;
        self.prototype.define = self.prototype.define_method;
        self.prototype.override_methods = self.prototype.override_method;
        self.prototype.override = self.prototype.override_method;
        self.prototype.define_static_methods = self.prototype.define_static_method;
        self.prototype.define_static = self.prototype.define_static_method;
        self.prototype.define_readers = self.prototype.define_reader;
        self.prototype.define_writers = self.prototype.define_writer;

        function _add_mixin(mixin) {
            if (!mixin.prototype) return;
            Object.getOwnPropertyNames(mixin.prototype).forEach(function (key) {
                if (_is_function(mixin.prototype[key])) {
                    this._class.prototype[key] = mixin.prototype[key];
                } else {
                    var property_descriptor = Object.getOwnPropertyDescriptor(mixin.prototype, key);
                    if (property_descriptor) {
                        Object.defineProperty(this._class.prototype, key, property_descriptor);
                    }
                }
            }, this);
        }

        function _define_method(methodName, methodFunc) {
            this._class.prototype[methodName] = methodFunc;
        }

        function _override_method(methodName, methodFunc) {
            this._class.prototype[_configuration.parent_method_prefix + methodName] = this._class.prototype[methodName];
            _define_method.call(this, methodName, methodFunc);
        }

        function _define_static_method(methodName, methodFunc) {
            this._class[methodName] = methodFunc;
        }

        function _define_accessors(propertyName) {
            _define_reader.call(this, propertyName);
            _define_writer.call(this, propertyName);
        }

        function _define_reader(propertyName, methodFunc) {
            var getter = _is_function(methodFunc) ? methodFunc : new Function('return this.' + _prop(propertyName));
            if (_configuration.property_accessors) {
                _update_property_descriptor.call(this, propertyName, {get: getter});
            } else {
                this._class.prototype[_getter(propertyName)] = getter;
            }
        }

        function _define_writer(propertyName, methodFunc) {
            var setter = _is_function(methodFunc) ? methodFunc : new Function('newVal', 'this.' + _prop(propertyName) + '= newVal');
            if (_configuration.property_accessors) {
                _update_property_descriptor.call(this, propertyName, {set: setter});
            } else {
                this._class.prototype[_setter(propertyName)] = setter;
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
            var descriptor = _get_property_descriptor.call(this, propertyName) || {configurable: true};
            for (var key in descriptorUpdates) {
                if (descriptorUpdates.hasOwnProperty(key)) {
                    descriptor[key] = descriptorUpdates[key];
                }
            }
            Object.defineProperty(this._class.prototype, propertyName, descriptor);
        }

        function _get_property_descriptor(propertyName) {
            var clazz = this._class.prototype;
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
        var self = function (hash) {
            this._hash = _is_object(hash) ? hash : {};
        };

        self.prototype.to_object = function () {
            return this._hash;
        };

        self.prototype.to_obj = self.prototype.to_object;

        self.prototype.add = function (key, value, overwrite) {
            overwrite = overwrite || false;
            if (_is_defined(value) && (overwrite || !this._hash.hasOwnProperty(key) || _is_undefined(this._hash[key]))) {
                this._hash[key] = value;
            }
            return this;
        };

        self.prototype.soft_add = self.prototype.add;

        self.prototype.hard_add = function (key, value) {
            return this.add(key, value, true);
        };

        self.prototype.merge = function (otherHash, overwrite) {
            overwrite = overwrite || false;
            for (var key in otherHash) {
                if (otherHash.hasOwnProperty(key) && _is_defined(otherHash[key])) {
                    this.add(key, otherHash[key], overwrite);
                }
            }
            return this;
        };

        self.prototype.soft_merge = self.prototype.merge;

        self.prototype.hard_merge = function (otherHash) {
            return this.merge(otherHash, true);
        };

        return self;
    }();

    // ======================================================================================
    //  meta.ObjectMap
    //  collecting objects into associative array
    // ======================================================================================

    var ObjectMap = function () {
        var self = function (opts) {
            opts = opts || {};
            this._map = {};
            this._id_field = opts.id_field || 'id';

            this._mirrors_for_adding = opts.mirrors_for_adding || [];
            this._mirrors_for_removing = opts.mirrors_for_removing || [];
            
            (opts.objects || []).forEach(function (obj) { this.add(obj) }, this);
        };

        self.prototype.get = function (id) {
            return this._map[id] || null;
        };

        self.prototype.contains = function (id) {
            return this._map.hasOwnProperty(id);
        };

        self.prototype.add = function (el) {
            this._add(el, []);
        };

        self.prototype._add = function (el, processed_mirror_chain) {
            this._map[el[this._id_field]] = el;
            this._mirrors_for_adding.forEach(function (mirror) {
                if (!~processed_mirror_chain.indexOf(mirror)) {
                    mirror._add(el, processed_mirror_chain.concat([this]));
                }
            }, this);
        };

        self.prototype.remove = function (id) {
            this._remove(id, []);
        };

        self.prototype._remove = function (id, processed_mirror_chain) {
            delete this._map[id];
            this._mirrors_for_removing.forEach(function (mirror) {
                if (!~processed_mirror_chain.indexOf(mirror)) {
                    mirror._remove(id, processed_mirror_chain.concat([this]));
                }
            }, this);
        };

        self.prototype.size = function () {
            return Object.keys(this._map).length;
        };

        self.prototype.to_array = function () {
            return Object.keys(this._map).map(function (id) {
                return this._map[id];
            }, this);
        };

        self.prototype.to_arr = self.prototype.to_array;

        self.prototype.get_by_index = function (index) {
            return this.to_arr()[index];
        };

        ['each', 'map', 'every', 'some', 'reduce'].forEach(function (method_name) {
            var array_prototype_method_name = method_name == 'each' ? 'forEach' : method_name;
            self.prototype[method_name] = function () {
                return Array.prototype[array_prototype_method_name].apply(this.to_array(), arguments);
            };
        }, this);

        self.prototype.add_mirror_for_adding = function (mirror_for_adding) {
            this._mirrors_for_adding.push(mirror_for_adding);
        };

        self.prototype.add_mirror_for_removing = function (mirror_for_removing) {
            this._mirrors_for_removing.push(mirror_for_removing);
        };

        return self;
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
        return !!(something && (typeof something  === 'object'));
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

    function _is_number(something) {
        return typeof something === 'number';
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
    window.meta.ObjectMap = ObjectMap;
}());