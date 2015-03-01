function GuyWithPanzerschreck(opts, draw) {
    var self = Unit(opts);

    self._weapon = RocketLauncher({
        stage: self._stage,
        bullets: self._bullets
    }, false);

    self.draw = function() {
        Painter.circle(self, self._radius, "#8D91E3");
        Painter.rectangle(self, 10, 2 * (self._radius - 1), 5, self._radius - 1, "#34378A");

        self._weapon.draw();
    };

    if (draw !== false) {
        self.draw();
    }

    return self;
}
