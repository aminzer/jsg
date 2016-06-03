function DefaultAI() {
    FakeAI.call(this);

    this._actionChanged = false;
    this._changeActionTimer = setInterval(function () {
        this._actionChanged = false;
    }.bind(this), 1000);
}

new meta.Class( DefaultAI )

    .extend_from( FakeAI )

    .define_methods({
        resolve: function () {
            var target = this._getTargets()[0];

            gctx.units.forEach(function (unit) {
                if (this._isControllable(unit)) {
                    unit.aimAt(target.x, target.y);

                    var shootingAllowed = this._canShoot.call(this, unit, target);

                    if (!shootingAllowed) {
                        unit.stopShooting();
                    }

                    if (this._actionChanged == false) {    // random behaviour
                        if (random() > 0.5) {
                            unit.stopShooting();
                            unit.startMoving(MathUtility.getLinesAngle(
                                    unit.x,
                                    unit.y,
                                    target.x,
                                    target.y
                                ) + random() * 90 - 45);
                        } else {
                            unit.stopMoving();
                            if (shootingAllowed) {
                                unit.startShooting();
                            }
                        }
                    }
                }
            }, this);

            this._actionChanged = true;
        },

        _canShoot: function (shooter, target) {
            return gctx.units.every(function (unit) {
                if (unit === shooter || unit === target) {
                    return true;
                }
                return !this._isControllable(unit) || !this._isOnFiringLine(shooter, unit);
            }, this);
        },

        _isOnFiringLine: function (shooter, target) {
            if (!meta.common.is_defined(target.radius)) {  // TODO fix for square units and composite weapons
                return false;
            }
            return MathUtility.isRayPassThroughCircle(      // TODO check if weapon exist
                shooter.weapon.x,
                shooter.weapon.y,
                shooter.weapon.angle,
                target.x,
                target.y,
                target.radius
            );
        }
    })
;
