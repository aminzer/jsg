function Fraction(opts, draw) {
    var self = Bullet(opts, false);

    self.draw = function() {
        Painter.rectangle(self, 3, 3, 1.5, 1.5, "#f00");
    };

    if (draw !== false) {
        self.draw();
    }

    return self;
}
