function Cursor(opts, render) {
    opts = opts || {};

    MovingObject.call(this, opts);

    if (render !== false) {
        this.render();
    }
}

Extend(Cursor).from(MovingObject);

Cursor.prototype.render = function () {
    Painter.rectangle(this, 9, 4, 12, 2, "#fff");
    Painter.rectangle(this, 9, 4, -3, 2, "#fff");
    Painter.rectangle(this, 4, 9, 2, 12, "#fff");
    Painter.rectangle(this, 4, 9, 2, -3, "#fff");

    Painter.rectangle(this, 7, 2, 11, 1, "#000");
    Painter.rectangle(this, 7, 2, -4, 1, "#000");
    Painter.rectangle(this, 2, 7, 1, 11, "#000");
    Painter.rectangle(this, 2, 7, 1, -4, "#000");

    Painter.circle(this, 10, "rgba(0, 0, 255, 0.1)");
};
