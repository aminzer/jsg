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
            Painter.shape(this, function (shape) {
                shape.graphics
                    .beginFill(this._mainColor).drawCircle(0, 0, this.radius)
                    .beginFill(this._extraColor).drawRect(-5, -this.radius + 1, 10, 2 * (this.radius - 1))
            });

            if (this.hasWeapon()) {
                this.weapon.render();
            }
        }
    })
;
