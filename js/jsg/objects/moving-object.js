function MovingObject(opts) {
    opts = opts || {};

    ShapedObject.call(this, opts);

    this._isMoving = this.def( opts.isMoving, false );
    this._speed = this.def( opts.speed, UNIT.DEFAULT.SPEED );
    this._movementAngle = this.def( opts.movementAngle, 0 );
}

Extend(MovingObject).from(ShapedObject);

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

MovingObject.prototype.getXSpeed = function() {
    return this._speed * cos_d(this._movementAngle);
};

MovingObject.prototype.getYSpeed = function() {
    return this._speed * sin_d(this._movementAngle);
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
