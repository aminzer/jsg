function SquareUnit(opts) {
    opts = opts || {};

    SquareObject.call(this, opts);
    Unit.call(this, opts);

    this.length = meta.common.first_defined( opts.length, 2 * UNIT.DEFAULT.RADIUS );
    this.width = meta.common.first_defined( opts.width, 2 * UNIT.DEFAULT.RADIUS );
}

meta.Class( SquareUnit )

    .extend_from( Unit )

    .add_mixin( SquareObject )
;
