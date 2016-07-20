function SquareUnit(opts) {
    opts = new meta.Hash( opts).merge({
        length: 2 * UNIT.DEFAULT.RADIUS,
        width: 2 * UNIT.DEFAULT.RADIUS
    }).to_obj();

    SquareObject.call(this, opts);
    Unit.call(this, opts);
}

new meta.Class( SquareUnit )

    .extend_from( Unit )

    .add_mixin( SquareObject )
;
