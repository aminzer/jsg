function CircleUnit(opts) {
    opts = opts || {};

    CircleObject.call(this, opts);
    Unit.call(this, opts);

    this.radius = meta.common.first_defined( opts.radius, UNIT.DEFAULT.RADIUS );
}

new meta.Class( CircleUnit )

    .extend_from( Unit )

    .add_mixin( CircleObject )
;
