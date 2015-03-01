function Tank(opts, draw) {
    var self = Unit(opts);

    var _timer = null;

    self.setMaxHp(TANK_HP);

    self.setWeapon(TankGun({
        stage: self.getStage(),
        bullets: self.getBullets()
    }, false));

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

        self.getWeapon().draw();
    };

    if (draw !== false) {
        self.draw();
    }

    self.aimAt = function(targetX, targetY) {
        if (self.getMovingAngle() != NO_MOVEMENT) {
            self.setAngle(self.getMovingAngle());
        }
        self.getWeapon().aimAt(targetX, targetY, self.getX(), self.getY(), self.getAngle());
    };

    self.startMoving = function(angle) {
        if (_timer != null) {
            return;
        }

        var old = self.getAngle();

        _timer = setInterval(function() {
            if (self.getMovingAngle() == NO_MOVEMENT) {
                clearInterval(_timer);
                _timer = null;
            }
            var sign = (angle - old > 0) ? 1 : -1;
            sign = (Math.abs(angle - self.getAngle()) < 10) ? 0 : sign;
            if (sign == 0) {
                clearInterval(_timer);
                _timer = null;
            }
            //console.log(self.getAngle());
            self.setMovingAngle(self.getAngle() + sign);
        }, 20);

    };

    return self;
}
