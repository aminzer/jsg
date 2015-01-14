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
                _dynamicObjects[i].aimAt(_target.getX(), _target.getY());
                /*if (_changeAction == true) {
                    if (random() > 0.3) {
                        _dynamicObjects[i].stopShooting();
                        _dynamicObjects[i].startMoving(MathUtility.getLinesAngle(
                            _dynamicObjects[i].getX(),
                            _dynamicObjects[i].getY(),
                            _target.getX(),
                            _target.getY()
                        ) + random() * 90 - 45);
                    } else {
                        _dynamicObjects[i].stopMoving();
                        _dynamicObjects[i].startShooting();
                    }
                }*/
            }
        }
        _changeAction = false;
    };

    return self;
}
