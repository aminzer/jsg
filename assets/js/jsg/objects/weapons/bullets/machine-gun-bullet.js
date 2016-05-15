function MachineGunBullet(opts, render) {
    opts = new meta.Hash(opts).merge({
        damage: BULLET.MACHINE_GUN.DAMAGE,
        speed: BULLET.MACHINE_GUN.SPEED,
        lifetime: BULLET.MACHINE_GUN.LIFETIME
    }).to_obj();

    Bullet.call(this, opts, render);
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
