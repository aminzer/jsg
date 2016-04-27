function AI(opts) {
    opts = opts || {};

    this._units = _.units();
    this._target = opts.target || _.players()[0];

    this._changeAction = true;

    var self = this;
    this._changeActionTimer = setInterval(function () {
        self._changeAction = true;
    }, 1000);
}

AI.prototype.resolve = function() {
    var self = this;

    this._units.forEach(function(unit) {
        if (unit.getObjectType() === OBJECT_TYPE.ENEMY) {
            unit.aimAt(self._target.getX(), self._target.getY());

            var shootingAllowed = canShoot(unit, self._target, self._units);

            if (!shootingAllowed) {
                unit.stopShooting();
            }

            if (self._changeAction == true) {    // random behaviour
                if (random() > 0.5) {
                    unit.stopShooting();
                    unit.startMoving(MathUtility.getLinesAngle(
                            unit.getX(),
                            unit.getY(),
                            self._target.getX(),
                            self._target.getY()
                        ) + random() * 90 - 45);
                } else {
                    unit.stopMoving();
                    if (shootingAllowed) {
                        unit.startShooting();
                    }
                }
            }
        }
    });

    this._changeAction = false;

    function canShoot(shooter, target, units) {        // check all friends on firing lines
        for (var k = 0; k < units.length; k++) {
            var unit = units[k];
            if (unit === shooter || unit === target) {
                continue;
            }
            if (unit.getObjectType() === OBJECT_TYPE.ENEMY && isOnFiringLine(shooter, unit)) {
                return false;
            }
        }
        return true;
    }

    function isOnFiringLine(shooter, target) {
        // TODO fix for square units
        if (!TypeUtility.isDefined(target.getRadius)) {
            return false;
        }
        return MathUtility.isRayPassThroughCircle(
            shooter.getWeapon().getX(),
            shooter.getWeapon().getY(),
            shooter.getWeapon().getAngle(),
            target.getX(),
            target.getY(),
            target.getRadius()
        );
    }
};
