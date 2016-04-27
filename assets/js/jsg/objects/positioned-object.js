function PositionedObject(opts) {
    opts = opts || {};

    BaseObject.call(this, opts);

    this._x = this.def( opts.x, 0 );
    this._y = this.def( opts.y, 0 );
    this._angle = this.def( opts.angle, 0 );
    this._naturalAngle = this.def( opts.naturalAngle, 0 );
}

Extend(PositionedObject).from(BaseObject);

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

PositionedObject.prototype.getPosition = function() {
    return { x: this._x, y: this._y };
};

PositionedObject.prototype.setPosition = function(position) {
    this._x = position.x;
    this._y = position.y;
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
