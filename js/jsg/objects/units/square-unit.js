function SquareUnit(opts) {
    opts = opts || {};

    Unit.call(this, opts);

    this._length = this.def( opts.length || 2 * UNIT.DEFAULT.RADIUS );
    this._width = this.def( opts.width || 2 * UNIT.DEFAULT.RADIUS );
}

SquareUnit.prototype = Object.create(Unit.prototype);

SquareUnit.prototype.isPointInside = function(pointX, pointY) {
    var relativeX = (pointX - this.getX()) * cos_d(this.getAngle()) + (pointY - this.getY()) * sin_d(this.getAngle());
    var relativeY = -(pointX - this.getX()) * sin_d(this.getAngle()) + (pointY - this.getY()) * cos_d(this.getAngle());
    return (Math.abs(relativeX) <= this._length / 2) && (Math.abs(relativeY) <= this._width / 2);
};

SquareUnit.prototype.getLength = function() {
    return this._length;
};

SquareUnit.prototype.setLength = function(length) {
    this._length = length;
};

SquareUnit.prototype.getWidth = function() {
    return this._width;
};

SquareUnit.prototype.setWidth = function(width) {
    this._width = width;
};
