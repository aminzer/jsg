function MachineGunBullet(opts, render) {
    opts = opts || {};

    Bullet.call(this, opts, false);

    this.setDamage(this.def( opts.damage, BULLET.MACHINE_GUN.DAMAGE ));
    this.setSpeed(this.def( opts.speed, BULLET.MACHINE_GUN.SPEED ));
    this.setLifetime(this.def( opts.lifetime, BULLET.MACHINE_GUN.LIFETIME ));

    if (render !== false) {
        this.render();
    }
}

MachineGunBullet.prototype = Object.create(Bullet.prototype);

MachineGunBullet.prototype.render = function() {
    Painter.circle(this, 2, "#000");
    Painter.circle(this, 1, "#600");
};
