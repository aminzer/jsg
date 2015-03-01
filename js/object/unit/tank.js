function Tank(opts, draw) {
    var self = Unit(opts);

    var _timer = null;

    self.setMaxHp(TANK_HP);

    self._weapon = TankGun({
        stage: self._stage,
        bullets: self._bullets
    }, false);

    self.draw = function() {
        Painter.roundRectangle(self, 150, 80, 75, 40, 5, "#474924");

        Painter.offsetRoundRectangle(self, 0, 52, 140, 20, 70, 10, 5, "#444");
        Painter.offsetRoundRectangle(self, 0, -52, 140, 20, 70, 10, 5, "#444");

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
        if (self._movingAngle != NO_MOVEMENT) {
            self.angle = self._movingAngle;
        }
        self._weapon.aimAt(targetX, targetY, self.x, self.y, self.angle);
    };

    self.startMoving = function(angle) {
        if (_timer != null) {
            return;
        }

        var old = self.angle;

        _timer = setInterval(function() {
            if (self._movingAngle == NO_MOVEMENT) {
                clearInterval(_timer);
                _timer = null;
            }
            var sign = (angle - old > 0) ? 1 : -1;
            sign = (Math.abs(angle - self.angle) < 10) ? 0 : sign;
            if (sign == 0) {
                clearInterval(_timer);
                _timer = null;
            }
            //console.log(self.getAngle());
            self._movingAngle = self.angle + sign;
        }, 20);

    };

    return self;
}
