function AI(opts) {
    var self = {};

    var _units = opts.units;
    var _target = opts.target;

    var _changeAction = true;
    var _changeActionTimer = setInterval(function () {
        _changeAction = true;
    }, 700);

    self.resolve = function() {
        for (var i = 0; i < _units.length; i++) {
            if (_units[i].getObjectType() & OBJECT_TYPE_ENEMY) {
                _units[i].aimAt(_target.getX(), _target.getY());   // aim at target

                if (!canShoot(_units[i])) {    // prevent friendly fire
                    _units[i].stopShooting();
                }

                if (_changeAction == true) {    // random behaviour
                    if (random() > 0.5) {
                        _units[i].stopShooting();
                        _units[i].startMoving(MathUtility.getLinesAngle(
                            _units[i].getX(),
                            _units[i].getY(),
                            _target.getX(),
                            _target.getY()
                        ) + random() * 90 - 45);
                    } else {
                        _units[i].stopMoving();
                        if (canShoot(_units[i])) {
                            _units[i].startShooting();
                        }
                    }
                }
            }
        }
        _changeAction = false;
    };

    function canShoot(shooter) {        // check all friends on firing lines
        for (var k = 0; k < _units.length; k++) {
            if ((_units[k].getObjectType() & OBJECT_TYPE_ENEMY) && isOnFiringLine(shooter, _units[k])) {
                return false;
            }
        }
        return true;
    }

    function isOnFiringLine(shooter, target) {
        return MathUtility.isRayPassThroughCircle(
            shooter.getWeapon().getX(),
            shooter.getWeapon().getY(),
            shooter.getWeapon().getAngle(),
            target.getX(),
            target.getY(),
            target.getRadius()
        );
    }

    return self;
}
