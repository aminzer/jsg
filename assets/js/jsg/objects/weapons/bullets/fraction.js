function Fraction(opts, render) {
    opts = opts || {};

    Bullet.call(this, opts, render);

    this.damage = meta.common.first_defined( opts.damage, BULLET.DEFAULT.DAMAGE );
    this.speed = meta.common.first_defined( opts.speed, BULLET.DEFAULT.SPEED );
    this.lifetime = meta.common.first_defined( opts.lifetime, BULLET.DEFAULT.LIFETIME );
}

meta.Class( Fraction )

    .extend_from( Bullet )

    .define_methods({
        render: function () {
            Painter.rectangle(this, 3, 3, 1.5, 1.5, "#f00");
        }
    })
;
