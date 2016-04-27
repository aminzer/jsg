function CircleUnit(opts) {
    opts = opts || {};

    CircleObject.call(this, opts);
    Unit.call(this, opts);

    this.setRadius(this.def( opts.radius, UNIT.DEFAULT.RADIUS ));
}

Extend(CircleUnit).from(Unit).withMixins(CircleObject);
