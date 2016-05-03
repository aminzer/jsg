function Tommy(opts, render) {
    opts = opts || {};

    CircleUnit.call(this, opts);

    this._mainColor = meta.common.first_defined( opts.mainColor, '#199EE0' );
    this._extraColor = meta.common.first_defined( opts.extraColor, '#559' );

    if (render !== false) {
        this.render();
    }
}

meta.Class( Tommy )

    .extend_from( CircleUnit )

    .define_method({
        render: function () {
            Painter.circle(this, this.getRadius(), this._mainColor);
            Painter.rectangle(this, 10, 2 * (this.getRadius() - 1), 5, this.getRadius() - 1, this._extraColor);

            if (this.hasWeapon()) {
                this.getWeapon().render();
            }
        }
    })
;
