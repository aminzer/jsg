function AI(opts) {
    var self = {};

    var _dynamicObjects = opts.dynamicObjects;
    var _target = opts.target;

    var _changeAction = true;
    var _changeActionTimer = setInterval(function () {
        _changeAction = true;
    }, 700);

    self.resolve = function() {
        for (var i = 0; i < _dynamicObjects.length; i++) {
            if (_dynamicObjects[i].getObjectType() & OBJECT_TYPE_ENEMY) {
                _dynamicObjects[i].aimAt(_target.getX(), _target.getY());   // aim at target

                if (!canShoot(_dynamicObjects[i])) {    // prevent friendly fire
                    _dynamicObjects[i].stopShooting();
                }

                if (_changeAction == true) {    // random behaviour
                    if (random() > 0.5) {
                        _dynamicObjects[i].stopShooting();
                        _dynamicObjects[i].startMoving(MathUtility.getLinesAngle(
                            _dynamicObjects[i].getX(),
                            _dynamicObjects[i].getY(),
                            _target.getX(),
                            _target.getY()
                        ) + random() * 90 - 45);
                    } else {
                        _dynamicObjects[i].stopMoving();
                        if (canShoot(_dynamicObjects[i])) {
                            _dynamicObjects[i].startShooting();
                        }
                    }
                }
            }
        }
        _changeAction = false;
    };

    function canShoot(shooter) {        // check all friends on firing lines
        for (var k = 0; k < _dynamicObjects.length; k++) {
            if ((_dynamicObjects[k].getObjectType() & OBJECT_TYPE_ENEMY) && isOnFiringLine(shooter, _dynamicObjects[k])) {
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
