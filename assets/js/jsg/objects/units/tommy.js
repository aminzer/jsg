function Tommy(opts, render) {
    opts = opts || {};

    CircleUnit.call(this, opts);

    this._mainColor = meta.common.first_defined( opts.mainColor, '#199EE0' );
    this._extraColor = meta.common.first_defined( opts.extraColor, '#559' );

    if (render !== false) {
        this.render();
    }
}

new meta.Class( Tommy )

    .extend_from( CircleUnit )

    .define_method({
        render: function () {
            Painter.circle(this, this.radius, this._mainColor);
            Painter.rectangle(this, 10, 2 * (this.radius - 1), 5, this.radius - 1, this._extraColor);

            if (this.hasWeapon()) {
                this.weapon.render();
            }
        }
    })
;
