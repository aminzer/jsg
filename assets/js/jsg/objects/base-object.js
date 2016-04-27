function BaseObject(opts) {
    opts = opts || {};
    this._id = UID.generate();
    this._objectType = this.def(opts.objectType, OBJECT_TYPE.UNDEFINED);
}

BaseObject.prototype.getId = function() {
    return this._id;
};

BaseObject.prototype.setId = function(id) {
    this._id = id;
};

BaseObject.prototype.getObjectType = function() {
    return this._objectType;
};

BaseObject.prototype.setObjectType = function(objectType) {
    this._objectType = objectType;
};


BaseObject.prototype.def = function(value, defaultValue) {
    if (typeof (value) !== 'undefined') {
        return value;
    }
    return defaultValue;
};

BaseObject.prototype.setIfUndefined = function(opts, key, defaultValue) {
    opts = opts || {};
    if (!opts.hasOwnProperty(key)) {
        opts[key] = defaultValue;
    }
};
