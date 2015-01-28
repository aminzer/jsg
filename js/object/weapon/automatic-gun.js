function AutomaticGun(opts, draw) {
    var self = AutomaticWeapon(opts);

    self.draw = function() {
        Painter.rectangle(self, self.getFrontLength() + 15, 5, 15, 2.5, "#555");
        Painter.rectangle(self, 10, 5, -7, 0, "#691C1C");
        Painter.rectangle(self, self.getFrontLength(), 2, 10, 1, "#ddd");
    };

    if (draw !== false) {
        self.draw();
    }

    return self;
}
