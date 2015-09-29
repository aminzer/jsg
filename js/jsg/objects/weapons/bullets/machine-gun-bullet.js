function MachineGunBullet(opts, render) {
    opts = opts || {};

    Bullet.call(this, opts, false);

    this.setDamage(opts.damage || BULLET.MACHINE_GUN.DAMAGE);
    this.setSpeed(opts.speed || BULLET.MACHINE_GUN.SPEED );
    this.setLifetime(opts.lifetime || BULLET.MACHINE_GUN.LIFETIME);

    if (render !== false) {
        this.render();
    }
}

MachineGunBullet.prototype = Object.create(Bullet.prototype);

MachineGunBullet.prototype.render = function() {
    Painter.circle(this, 2, "#000");
    Painter.circle(this, 1, "#600");
};
