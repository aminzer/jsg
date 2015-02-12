function GuyWithPanzerschreck(opts, draw) {
    var self = Unit(opts);

    self.setWeapon(RocketLauncher({
        stage: self.getStage(),
        bullets: self.getBullets()
    }, false));

    self.draw = function() {
        Painter.circle(self, UNIT_RADIUS, "#8D91E3");
        Painter.rectangle(self, 10, 2 * (UNIT_RADIUS - 1), 5, UNIT_RADIUS - 1, "#34378A");

        self.getWeapon().draw();
    };

    if (draw !== false) {
        self.draw();
    }

    return self;
}
