function GrandfathersGun(opts, draw) {
    var self = new Weapon(opts);

    self.draw = function() {
        Painter.rectangle(self, self.getFrontLength() + 15, 5, 15, 2.5, "#444");
        Painter.rectangle(self, self.getFrontLength(), 2, 10, 1, "#999");
    };

    if (draw !== false) {
        self.draw();
    }

    return self;
}
