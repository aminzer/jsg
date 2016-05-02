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
            var relativeX = (pointX - this.getX()) * cos_d(this.getAngle()) + (pointY - this.getY()) * sin_d(this.getAngle());
            var relativeY = -(pointX - this.getX()) * sin_d(this.getAngle()) + (pointY - this.getY()) * cos_d(this.getAngle());
            return (Math.abs(relativeX) <= this._length / 2) && (Math.abs(relativeY) <= this._width / 2);
        }
    })
;
