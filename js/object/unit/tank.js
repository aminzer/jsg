function Tank(opts, draw) {
    var self = Unit(opts);

    self._unitForm = UNIT_FORM_RECTANGLE;

    var _turnTimer = null;
    var _neededDirection;
    var _turnError = 10;

    var _tracksTimer = null;
    var _tracksShapes = [];
    var _tracksOffset = 10;

    self.setMaxHp(TANK_HP);

    self.isPointInside = function(pointX, pointY) {
        // TODO: maybe should define height and width and use it here and in draw()
        // NOTE: 62 = 40 (tank height) + 20 (tracks height) + 2 (tracks offset)
        return ((pointX >= self.x - 75) && (pointX <= self.x + 75)) && ((pointY >= self.y - 62) && (pointY <= self.y + 62));
    };

    self._weapon = TankGun({
        stage: self._stage,
        bullets: self._bullets
    }, false);

    self.draw = function() {
        Painter.roundRectangle(self, 150, 80, 75, 40, 5, "#474924");

        Painter.offsetRoundRectangle(self, 0, 52, 140, 20, 70, 10, 5, "#444");
        Painter.offsetRoundRectangle(self, 0, -52, 140, 20, 70, 10, 5, "#444");

        _drawTracks();

        Painter.offsetRoundRectangle(self, -45, 20, 40, 20, 25, 10, 3, "#402511");
        Painter.offsetRoundRectangle(self, -45, -20, 40, 20, 25, 10, 3, "#402511");

        Painter.offsetRectangle(self, 80, 0, 6, 70, 3, 35, "#8B4D40");
        Painter.offsetRectangle(self, 85, 20, 10, 4, 5, 2, "#8B4D40");
        Painter.offsetRectangle(self, 85, 10, 10, 4, 5, 2, "#8B4D40");
        Painter.offsetRectangle(self, 85, -10, 10, 4, 5, 2, "#8B4D40");
        Painter.offsetRectangle(self, 85, -20, 10, 4, 5, 2, "#8B4D40");

        self._weapon.draw();
    };

    if (draw !== false) {
        self.draw();
    }

    self.aimAt = function(targetX, targetY) {
        if (self._movingAngle !== NO_MOVEMENT) {
            self.angle = self._movingAngle;
        }
        self._weapon.aimAt(targetX, targetY, self.x, self.y, self.angle);
    };

    self.startMoving = function(angle) {
        if (_tracksTimer == null) {
            _tracksTimer = setInterval(_moveTracks, 200);
        }

        _neededDirection = angle;

        if (MathUtility.absoluteAngleDifference(self.angle, _neededDirection) < _turnError) {  // if tank already directed right
            if (self._movingAngle == NO_MOVEMENT) {
                self._movingAngle = self.angle;
            }
            return;
        }

        if (_turnTimer == null) {
            self._movingAngle = self.angle;
            _turnTimer = setInterval(function() {
                var sign = MathUtility.isClockwiseDirection(self.angle, _neededDirection) ? 1 : -1;
                self._movingAngle += self._speed / 1.5 * sign;

                if (MathUtility.absoluteAngleDifference(self.angle, _neededDirection) < _turnError) {   // if tank finished turning
                    clearInterval(_turnTimer);
                    _turnTimer = null;
                }
            }, 20);
        }
    };

    self.stopMoving = function() {
        self._movingAngle = NO_MOVEMENT;
        clearInterval(_turnTimer);
        _turnTimer = null;
        clearInterval(_tracksTimer);
        _tracksTimer = null;
    };

  //  self.startShooting = function() {};

    function _drawTracks() {
        for (var i = 0; i < 7; i++) {
            _tracksShapes.push(Painter.offsetRectangle(self, 10 + 20 * i, 52, 10, 20, 70, 10, "#555"));
            _tracksShapes.push(Painter.offsetRectangle(self, 10 + 20 * i, -52, 10, 20, 70, 10, "#555"));
        }
    }

    function _moveTracks() {
        for (var i = 0; i < _tracksShapes.length; i++) {
            _tracksShapes[i].regX += _tracksOffset;
        }
        _tracksOffset *= -1;
    }

    return self;
}
