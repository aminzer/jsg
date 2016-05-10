function Cursor(opts, render) {
    opts = opts || {};

    MovingObject.call(this, opts);

    this._color = meta.common.first_defined( opts.color, "rgba(0,0,255,0.1)" );

    if (render !== false) {
        this.render();
    }
}

meta.Class( Cursor )

    .extend_from( MovingObject )

    .define_accessors([
        'color'
    ])

    .define_methods({
        render: function () {
            Painter.rectangle(this, 9, 4, 12, 2, "#fff");
            Painter.rectangle(this, 9, 4, -3, 2, "#fff");
            Painter.rectangle(this, 4, 9, 2, 12, "#fff");
            Painter.rectangle(this, 4, 9, 2, -3, "#fff");

            Painter.rectangle(this, 7, 2, 11, 1, "#000");
            Painter.rectangle(this, 7, 2, -4, 1, "#000");
            Painter.rectangle(this, 2, 7, 1, 11, "#000");
            Painter.rectangle(this, 2, 7, 1, -4, "#000");

            Painter.circle(this, 10, this.color);
        }
    })
;
