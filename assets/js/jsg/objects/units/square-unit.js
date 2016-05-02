function SquareUnit(opts) {
    opts = opts || {};

    SquareObject.call(this, opts);
    Unit.call(this, opts);

    this.setLength(meta.common.first_defined( opts.length, 2 * UNIT.DEFAULT.RADIUS ));
    this.setWidth(meta.common.first_defined( opts.width, 2 * UNIT.DEFAULT.RADIUS ));
}

Extend(SquareUnit).from(Unit).withMixins(SquareObject);
