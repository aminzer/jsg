function MovingObject(opts) {
    opts = opts || {};

    ShapedObject.call(this, opts);

    this._isMoving = opts.isMoving || false;
    this._speed = opts.speed || UNIT.DEFAULT.SPEED;
    this._movementAngle = opts.movementAngle || 0;
}

MovingObject.prototype = Object.create(ShapedObject.prototype);

MovingObject.prototype.startMoving = function(movementAngle) {
    this._isMoving = true;
    if (TypeUtility.isFloat(movementAngle)) {
        this._movementAngle = movementAngle ;
    }
};

MovingObject.prototype.stopMoving = function() {
    this._isMoving = false;
};

MovingObject.prototype.isMoving = function() {
    return this._isMoving;
};

MovingObject.getMovementAngle = function() {
    return this._movementAngle;
};

MovingObject.setMovementAngle = function(movementAngle) {
    this._movementAngle = movementAngle;
};

MovingObject.prototype.move = function() {
    if (this.isMoving()) {
        this.moveX(this._speed * cos_d(this._movementAngle));
        this.moveY(this._speed * sin_d(this._movementAngle));
    }
    return true;
};

MovingObject.prototype.getSpeed = function() {
    return this._speed;
};

MovingObject.prototype.setSpeed = function (speed) {
    this._speed = speed;
};

MovingObject.prototype.increaseSpeed = function( deltaSpeed ) {
    this._speed += deltaSpeed;
};

MovingObject.prototype.reduceSpeed = function( deltaSpeed ) {
    this.increaseSpeed( - deltaSpeed );
};
