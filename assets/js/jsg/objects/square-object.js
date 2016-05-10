function SquareObject(opts) {
    opts = opts || {};

    this._length = meta.common.first_defined( opts.length, 0 );
    this._width = meta.common.first_defined( opts.width, 0 );
}

meta.Class( SquareObject )

    .define_accessors([
        'length',
        'width'
    ])

    .define_method({
        isPointInside: function (pointX, pointY) {
            var relativeX = (pointX - this.x) * cos_d(this.angle) + (pointY - this.y) * sin_d(this.angle);
            var relativeY = -(pointX - this.x) * sin_d(this.angle) + (pointY - this.y) * cos_d(this.angle);
            return (Math.abs(relativeX) <= this._length / 2) && (Math.abs(relativeY) <= this._width / 2);
        }
    })
;
