function EnemyFactory(opts) {
    var self = {};

    var _stage = opts.stage;
    var _units = opts.units;
    var _bullets = opts.bullets;

    var _generatingDelay = opts.generatingDelay || ENEMY_FACTORY.DEFAULT.GENERATING_DELAY;

    var _enemyConstructors = new RandomAccessArray([
        {element: Recruit, weight: 10},
        {element: FootSoldier, weight: 5},
        {element: MachineGunner, weight: 2},
        {element: GuyWithPanzerschreck, weight: 1}
    ]);

    var _creationTimer = null;

    self.startGenerating = function() {
        _creationTimer = setInterval(generate, _generatingDelay);
    };

    self.stopGenerating = function() {
        clearInterval(_creationTimer);
        _creationTimer = null;
    };

    self.isGenerating = function() {
        return _creationTimer !== null;
    };

    function generate() {
        _units.push(_enemyConstructors.get()({
            stage: _stage,
            units: _units,
            bullets: _bullets,
            x: CANVAS_WIDTH * (random() / 2 + 0.5),
            y: CANVAS_HEIGHT * (random() / 2 + 0.5)
        }));
    }

    return self;
}
