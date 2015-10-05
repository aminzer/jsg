function MineDelivery(opts, render) {
    opts = opts || {};

    AcceleratingBullet.call(this, opts, false);

    this.setDamage(this.def( opts.damage, BULLET.MINE_DELIVERY.DAMAGE));
    this.setSpeed(this.def( opts.speed, BULLET.MINE_DELIVERY.START_SPEED));
    this.setLifetime(this.def( opts.lifetime, BULLET.MINE_DELIVERY.LIFETIME));

    this.setAcceleration(this.def( opts.acceleration, BULLET.MINE_DELIVERY.ACCELERATION));
    this.setBeginAccelerationLifetime(this.def( opts.beginAccelerationLifetime, BULLET.MINE_DELIVERY.BEGIN_ACCELERATION_LIFETIME));
    this.setEndAccelerationLifetime(this.def( opts.endAccelerationLifetime, BULLET.MINE_DELIVERY.END_ACCELERATION_LIFETIME));

    if (render !== false) {
        this.render();
    }
}

Extend(MineDelivery).from(AcceleratingBullet);

MineDelivery.prototype.render = function() {
    Painter.circle(this, 4, "#588DAD");
};

MineDelivery.prototype.die = function() {
    gctx.getBullets().push(new Mine({
        x: this.getX(),
        y: this.getY()
    }));
};
