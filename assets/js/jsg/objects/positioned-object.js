function PositionedObject(opts) {
    opts = opts || {};

    BaseObject.call(this, opts);

    this._x = meta.common.first_defined( opts.x, 0 );
    this._y = meta.common.first_defined( opts.y, 0 );
    this._angle = meta.common.first_defined( opts.angle, 0 );
    this._naturalAngle = meta.common.first_defined( opts.naturalAngle, 0 );
}

meta.Class( PositionedObject ).extend_from( BaseObject )

    .define_accessors([
        'x',
        'y',
        'angle',
        'naturalAngle'
    ])

    .define_reader('position', function () {
        return { x: this._x, y: this._y };
    })
    .define_writer('position', function (position) {
        this._x = position.x;
        this._y = position.y;
    })

    .define_methods({
        moveX: function (deltaX) {
            this._x += deltaX;
        },

        moveY: function (deltaY) {
            this._y += deltaY;
        },

        move: function () {
            return true;
        }
    })
;
