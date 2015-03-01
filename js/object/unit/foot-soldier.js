function FootSoldier(opts, draw) {
    var self = Unit(opts);

    self.setWeapon(AutomaticGun({
        stage: self.getStage(),
        bullets: self.getBullets()
    }, false));

    self.draw = function() {
        Painter.circle(self, UNIT_RADIUS, "#559");
        Painter.rectangle(self, 10, 2 * (UNIT_RADIUS - 1), 5, UNIT_RADIUS - 1, "#199EE0");

        self.getWeapon().draw();
    };

    if (draw !== false) {
        self.draw();
    }

    return self;
}
