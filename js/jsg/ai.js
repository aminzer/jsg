function AI(opts) {
    opts = opts || {};

    this._units = gctx.getUnits();
    this._target = opts.target || gctx.getPlayer();

    this._changeAction = true;

    var self = this;
    this._changeActionTimer = setInterval(function () {
        self._changeAction = true;
    }, 700);
}

AI.prototype.resolve = function() {
    for (var i = 0; i < this._units.length; i++) {
        var ownUnit = this._units[i];
        if (ownUnit.getObjectType() == OBJECT_TYPE.ENEMY) {
            ownUnit.aimAt(this._target.getX(), this._target.getY());   // aim at target

            if (!canShoot.call(this, ownUnit)) {    // prevent friendly fire
                ownUnit.stopShooting();
            }

            if (this._changeAction == true) {    // random behaviour
                if (random() > 0.5) {
                    ownUnit.stopShooting();
                    ownUnit.startMoving(MathUtility.getLinesAngle(
                            ownUnit.getX(),
                            ownUnit.getY(),
                            this._target.getX(),
                            this._target.getY()
                        ) + random() * 90 - 45);
                } else {
                    ownUnit.stopMoving();
                    if (canShoot.call(this, ownUnit)) {
                        ownUnit.startShooting();
                    }
                }
            }
        }
    }
    this._changeAction = false;

    function canShoot(shooter) {        // check all friends on firing lines
        for (var k = 0; k < this._units.length; k++) {
            var ownUnit = this._units[i];
            if (!ownUnit == this._target && (ownUnit.getObjectType() == OBJECT_TYPE.ENEMY) && isOnFiringLine.call(this, shooter, ownUnit)) {
                return false;
            }
        }
        return true;
    }

    function isOnFiringLine(shooter, target) {
        return MathUtility.isRayPassThroughCircle(
            shooter._weapon.x,
            shooter._weapon.y,
            shooter._weapon.angle,
            target.x,
            target.y,
            target._radius
        );
    }
};
