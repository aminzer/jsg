function Control(opts) {
    opts = opts || {};

    this._controlledObject = opts.controlledObject || _.player();
    this._cursor = opts.cursor || new Cursor();

    this._keyMap = opts.keyMap || CONTROLS.DEFAULT;
    this._properties = {};    // quick analog of _keyMap
}

Control.prototype.handleKeyDown = function(keyCode) {
    // your code here
};

Control.prototype.handleKeyUp = function(keyCode) {
    // your code here
};

Control.prototype.handleMouseUp = function(targetX, targetY) {
    // your code here
};

Control.prototype.handleMouseDown = function(targetX, targetY) {
    // your code here
};

Control.prototype.handleMouseMove = function(targetX, targetY) {
    // your code here
};

Control.prototype.handleMouseWheel = function(delta) {
    // your code here
};

Control.prototype.handleRender = function() {
    // your code here
};

Control.prototype.getControlledObject = function() {
    return this._controlledObject;
};

Control.prototype.setControlledObject = function(controlledObject) {
    this._controlledObject = controlledObject;
};

Control.prototype.getCursor = function() {
    return this._cursor;
};

Control.prototype.setCursor = function(cursor) {
    this._cursor = cursor;
};

Control.prototype.getKeyMap = function() {
    return this._keyMap;
};

Control.prototype.setKeyMap = function(keyMap) {
    this._keyMap = keyMap;
};

Control.prototype.isPressed = function(key) {
    return this._pressedKeys[this.getProperty(key)] === true;
};

Control.prototype.getProperty = function(keyString, defaultValue) {
    if (this._properties.hasOwnProperty(keyString)) {
        return this._properties[keyString];
    }

    defaultValue = typeof defaultValue === 'undefined' ? -1 : defaultValue;
    var res = this.getKeyMap();
    var keys = keyString.split('.');
    for (var i = 0; i < keys.length; i++) {
        if (!res.hasOwnProperty(keys[i]) || res[keys[i]] === null) {
            res = defaultValue;
            break;
        }
        res = res[keys[i]];
    }
    this._properties[keyString] = res;
    return res;
};
