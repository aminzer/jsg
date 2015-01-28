function MachineGunner(opts, draw) {
    var self = Unit(opts);

    self.setWeapon(MachineGun({
        stage: self.getStage(),
        bullets: self.getBullets()
    }, false));

    self.draw = function() {
        Painter.circle(self, UNIT_RADIUS, "#E08A19");
        Painter.rectangle(self, 10, 38, 5, 19, "#7A4D11");

        self.getWeapon().draw();
    };

    if (draw !== false) {
        self.draw();
    }

    return self;
}
