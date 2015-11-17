function Cursor(opts, render) {
    opts = opts || {};

    ShapedObject.call(this, opts);
}

Extend(Cursor).from(ShapedObject);
