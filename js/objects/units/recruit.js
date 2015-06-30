function Recruit(opts, draw) {
    var self = Unit(opts);

    self._weapon = GrandfathersGun({
        stage: self._stage,
        bullets: self._bullets
    }, false);

    self.draw = function() {
        Painter.circle(self, self._radius, "#199EE0");
        Painter.rectangle(self, 10, 2 * (self._radius - 1), 5, self._radius - 1, "#559");

        self._weapon.draw();
    };

    if (draw !== false) {
        self.draw();
    }

    return self;
}
