function SquareUnit(opts) {
    opts = opts || {};

    SquareObject.call(this, opts);
    Unit.call(this, opts);
}

Extend(SquareUnit).from(Unit).withMixins(SquareObject);
