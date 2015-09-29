function BaseObject(opts) {
    this._objectType = this.getDefinedValue(opts.objectType, OBJECT_TYPE.UNDEFINED);
}

BaseObject.prototype.getObjectType = function() {
    return this._objectType;
};

BaseObject.prototype.setObjectType = function(objectType) {
    this._objectType = objectType;
};


BaseObject.prototype.getDefinedValue = function(value, defaultValue) {
    if (typeof (value) === 'undefined') {
        return value;
    }
    return defaultValue;
};
