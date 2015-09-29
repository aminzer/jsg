function Destroyer(opts, draw) {
    var self = Unit(opts);

    self._radius = UNIT.DESTROYER.RADIUS;
    self.setMaxHp(UNIT.DESTROYER.HP);

    self._weapon = CompositeWeapon({
        stage: self._stage,
        bullets: self._bullets,
        weaponConstructors: [MachineGun, MachineGun, RocketLauncher],
        offsetsY: [-22, -9, 19],
        offsetsX: [-1, 2, 0]
    }, false);

    self.draw = function() {
        Painter.circle(self, self._radius, "#c22");
        Painter.rectangle(self, 10, 2 * (self._radius - 1), 5, self._radius - 1, "#fd1");
        Painter.rectangle(self, 26, 8, 13, -1, "#fd1");

        self._weapon.draw();
    };

    if (draw !== false) {
        self.draw();
    }

    return self;
}
