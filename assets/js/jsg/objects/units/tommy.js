function Tommy(opts, render) {
    opts = opts || {};

    CircleUnit.call(this, opts);

    this._mainColor = this.def( opts.mainColor, '#199EE0' );
    this._extraColor = this.def( opts.extraColor, '#559' );

    if (render !== false) {
        this.render();
    }
}

Extend(Tommy).from(CircleUnit);

Tommy.prototype.render = function() {
    Painter.circle(this, this.getRadius(), this._mainColor);
    Painter.rectangle(this, 10, 2 * (this.getRadius() - 1), 5, this.getRadius() - 1, this._extraColor);

    if (this.hasWeapon()) {
        this.getWeapon().render();
    }
};
