function MachineGunBullet(opts, render) {
    opts = opts || {};

    Bullet.call(this, opts, render);

    this.damage = meta.common.first_defined( opts.damage, BULLET.MACHINE_GUN.DAMAGE );
    this.speed = meta.common.first_defined( opts.speed, BULLET.MACHINE_GUN.SPEED );
    this.lifetime = meta.common.first_defined( opts.lifetime, BULLET.MACHINE_GUN.LIFETIME );
}

meta.Class( MachineGunBullet )

    .extend_from( Bullet )

    .define_methods({
        render: function () {
            Painter.circle(this, 2, "#000");
            Painter.circle(this, 1, "#600");
        }
    })
;
