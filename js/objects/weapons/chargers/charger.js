function Charger(opts) {
    var self = ShapedObject(opts);

    self._bulletConstructor = opts.bulletConstructor || Bullet;

    self.capacity = opts.capacity || 1000000;
    self.count = self.capacity;

    self.isEmpty = function() {
        return self.count == 0;
    };

    self.getBullet = function() {
        if (self.isEmpty()) return false;

        self.count--;
        return self._bulletConstructor({
            stage: self._stage,
            bullets: self._bullets
        });
    };

    return self;
}
