function MachineGunBullet(opts, render) {
    opts = new meta.Hash(opts).merge({
        damage: BULLET.MACHINE_GUN.DAMAGE,
        speed: BULLET.MACHINE_GUN.SPEED,
        lifetime: BULLET.MACHINE_GUN.LIFETIME
    }).to_obj();

    Bullet.call(this, opts, render);
}

new meta.Class( MachineGunBullet )

    .extend_from( Bullet )

    .define_methods({
        render: function () {
            Painter.shape(this, function (shape) {
                shape.graphics
                    .beginFill('#000').drawCircle(0, 0, 2)
                    .beginFill('#600').drawCircle(0, 0, 1);
            });
        }
    })
;
