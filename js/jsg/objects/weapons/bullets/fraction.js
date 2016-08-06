function Fraction(opts, render) {
    opts = new meta.Hash(opts).merge({
        damage: BULLET.DEFAULT.DAMAGE,
        speed: BULLET.DEFAULT.SPEED,
        lifetime: BULLET.DEFAULT.LIFETIME
    }).to_obj();

    Bullet.call(this, opts, render);
}

new meta.Class( Fraction )

    .extend_from( Bullet )

    .define_methods({
        render: function () {
            Painter.rect(this, 3, 3, '#f00');
        }
    })
;
