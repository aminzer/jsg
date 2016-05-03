function MovingObject(opts) {
    opts = opts || {};

    ShapedObject.call(this, opts);

    this._isMoving = meta.common.first_defined( opts.isMoving, false );
    this._speed = meta.common.first_defined( opts.speed, 0 );
    this._movementAngle = meta.common.first_defined( opts.movementAngle, 0 );
}

meta.Class( MovingObject )

    .extend_from( ShapedObject )

    .define_accessors([
        'isMoving',
        'speed',
        'movementAngle'
    ])

    .define_reader('xSpeed', function () {
        return this._speed * cos_d(this._movementAngle);
    })
    .define_reader('ySpeed', function () {
        return this._speed * sin_d(this._movementAngle);
    })

    .define_methods({
        startMoving: function (movementAngle) {
            this._isMoving = true;
            if (TypeUtility.isFloat(movementAngle)) {
                this._movementAngle = movementAngle;
            }
        },

        stopMoving: function () {
            this._isMoving = false;
        },

        isMoving: function () {
            return this._isMoving;
        },

        move: function () {
            if (this.isMoving()) {
                this.moveX(this._speed * cos_d(this._movementAngle));
                this.moveY(this._speed * sin_d(this._movementAngle));
            }
            return true;
        },

        increaseSpeed: function (deltaSpeed) {
            this._speed += deltaSpeed;
        },

        reduceSpeed: function (deltaSpeed)  {
            this.increaseSpeed(-deltaSpeed);
        }
    })
;
