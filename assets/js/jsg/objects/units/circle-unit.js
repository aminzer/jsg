function CircleUnit(opts) {
    opts = opts || {};

    CircleObject.call(this, opts);
    Unit.call(this, opts);

    this.setRadius(meta.common.first_defined( opts.radius, UNIT.DEFAULT.RADIUS ));
}

meta.Class( CircleUnit )

    .extend_from( Unit )

    .add_mixin( CircleObject )
;
