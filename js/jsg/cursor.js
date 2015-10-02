function Cursor(opts, draw) {
    opts = opts || {};

    ShapedObject.call(this, opts);
}

Extend(Cursor).from(ShapedObject);
