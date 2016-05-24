function CircleObject(opts) {
    opts = opts || {};

    this._radius = meta.common.first_defined( opts.radius, 0 );
}

new meta.Class( CircleObject )

    .define_accessors([
        'radius'
    ])

    .define_method({
        isPointInside: function(pointX, pointY) {
            return MathUtility.isInCircle(pointX, pointY, this.x, this.y, this._radius);
        }
    })
;
