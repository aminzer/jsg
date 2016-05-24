function GrandfathersGun(opts, render) {
    opts = opts || {};

    Weapon.call(this, opts);

    if (render !== false) {
        this.render();
    }
}

new meta.Class( GrandfathersGun )

    .extend_from( Weapon )

    .define_method({
        render: function () {
            Painter.rectangle(this, this.frontLength + 15, 5, 15, 2.5, "#444");
            Painter.rectangle(this, this.frontLength, 2, 10, 1, "#999");
        }
    })
;
