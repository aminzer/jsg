function MineDelivery(opts, render) {
    opts = opts || {};

    AcceleratingBullet.call(this, opts, false);

    this.setDamage(meta.common.first_defined( opts.damage, BULLET.MINE_DELIVERY.DAMAGE));
    this.setSpeed(meta.common.first_defined( opts.speed, BULLET.MINE_DELIVERY.START_SPEED));
    this.setLifetime(meta.common.first_defined( opts.lifetime, BULLET.MINE_DELIVERY.LIFETIME));

    this.setAcceleration(meta.common.first_defined( opts.acceleration, BULLET.MINE_DELIVERY.ACCELERATION));
    this.setBeginAccelerationLifetime(meta.common.first_defined( opts.beginAccelerationLifetime, BULLET.MINE_DELIVERY.BEGIN_ACCELERATION_LIFETIME));
    this.setEndAccelerationLifetime(meta.common.first_defined( opts.endAccelerationLifetime, BULLET.MINE_DELIVERY.END_ACCELERATION_LIFETIME));

    if (render !== false) {
        this.render();
    }
}

Extend(MineDelivery).from(AcceleratingBullet);

MineDelivery.prototype.render = function() {
    Painter.circle(this, 4, "#588DAD");
};

MineDelivery.prototype.die = function() {
    _.bullets().push(new Mine({
        x: this.getX(),
        y: this.getY()
    }));
};
