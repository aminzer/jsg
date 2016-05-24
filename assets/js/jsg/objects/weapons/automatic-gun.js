function AutomaticGun(opts, render) {
    opts = opts || {};

    AutomaticWeapon.call(this, opts);

    if (render !== false) {
        this.render();
    }
}

new meta.Class( AutomaticGun )

    .extend_from( AutomaticWeapon )

    .define_method({
        render: function () {
            Painter.rectangle(this, this.frontLength + 15, 5, 15, 2.5, "#555");
            Painter.rectangle(this, 10, 5, -7, 0, "#691C1C");
            Painter.rectangle(this, this.frontLength, 2, 10, 1, "#ddd");
        }
    })
;
