function Recruit(opts, draw) {
    var self = Unit(opts);

    self.setWeapon(GrandfathersGun({
        stage: self.getStage(),
        bullets: self.getBullets()
    }, false));

    self.draw = function() {
        Painter.circle(self, UNIT_RADIUS, "#199EE0");
        Painter.rectangle(self, 10, 2 * (UNIT_RADIUS - 1), 5, UNIT_RADIUS - 1, "#559");

        self.getWeapon().draw();
    };

    if (draw !== false) {
        self.draw();
    }

    return self;
}
