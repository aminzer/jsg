function MachineGunBullet(opts, render) {
    opts = opts || {};

    Bullet.call(this, opts, false);

    this.setDamage(meta.common.first_defined( opts.damage, BULLET.MACHINE_GUN.DAMAGE ));
    this.setSpeed(meta.common.first_defined( opts.speed, BULLET.MACHINE_GUN.SPEED ));
    this.setLifetime(meta.common.first_defined( opts.lifetime, BULLET.MACHINE_GUN.LIFETIME ));

    if (render !== false) {
        this.render();
    }
}

Extend(MachineGunBullet).from(Bullet);

MachineGunBullet.prototype.render = function() {
    Painter.circle(this, 2, "#000");
    Painter.circle(this, 1, "#600");
};
