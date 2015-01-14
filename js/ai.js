function AI(opts) {
    var self = {};

    var _dynamicObjects = opts.dynamicObjects;
    var _target = opts.target;



    self.resolve = function() {
        for (var i = 0; i < _dynamicObjects.length; i++) {
            if (_dynamicObjects[i] !== _target) {   // all enemies
                _dynamicObjects[i].aimAt(_target.getX(), _target.getY());
                 _dynamicObjects[i].startMoving(MathUtility.getLinesAngle(
                     _dynamicObjects[i].getX(),
                     _dynamicObjects[i].getY(),
                     _target.getX(),
                     _target.getY()
                 ));
                _dynamicObjects[i].startShooting();
            }
        }
    };

    return self;
}
