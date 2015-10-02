function SquareUnit(opts) {
    opts = opts || {};

    SquareObject.call(this, opts);
    Unit.call(this, opts);

    this.setLength(this.def( opts.length || 2 * UNIT.DEFAULT.RADIUS ));
    this.setWidth(this.def( opts.width || 2 * UNIT.DEFAULT.RADIUS ));
}

Extend(SquareUnit).from(Unit).withMixins(SquareObject);
