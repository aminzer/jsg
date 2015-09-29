function PositionedObject(opts) {
    opts = opts || {};

    BaseObject.call(this, opts);

    this._x = opts.x || 0;
    this._y = opts.y || 0;
    this._angle = opts.angle || 0;
    this._naturalAngle = opts.naturalAngle || 0;
}

PositionedObject.prototype = Object.create(BaseObject.prototype);

PositionedObject.prototype.moveX = function(deltaX) {
    this._x += deltaX;
};

PositionedObject.prototype.moveY = function(deltaY) {
    this._y += deltaY;
};

PositionedObject.prototype.move = function() {
    return true;
};

PositionedObject.prototype.getX = function() {
    return this._x;
};

PositionedObject.prototype.setX = function(x) {
    this._x = x;
};

PositionedObject.prototype.getY = function() {
    return this._y;
};

PositionedObject.prototype.setY = function(y) {
    this._y = y;
};

PositionedObject.prototype.getAngle = function() {
    return this._angle;
};

PositionedObject.prototype.setAngle = function(angle) {
    this._angle = angle;
};

PositionedObject.prototype.getNaturalAngle = function() {
    return this._naturalAngle;
};

PositionedObject.prototype.setNaturalAngle = function(naturalAngle) {
    this._naturalAngle = naturalAngle;
};
