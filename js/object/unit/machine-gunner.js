function MachineGunner(opts, draw) {
    var self = Unit(opts);

    self._weapon = MachineGun({
        stage: self._stage,
        bullets: self._bullets
    }, false);

    self.draw = function() {
        Painter.circle(self, self._radius, "#E08A19");
        Painter.rectangle(self, 10, 2 * (self._radius - 1), 5, self._radius - 1, "#7A4D11");

        self._weapon.draw();
    };

    if (draw !== false) {
        self.draw();
    }

    return self;
}
