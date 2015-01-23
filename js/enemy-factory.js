function EnemyFactory(opts) {
    var self = {};

    var _stage = opts.stage;
    var _dynamicObjects = opts.dynamicObjects;
    var _bullets = opts.bullets;

    var _generatingDelay = opts.generatingDelay || 2000;      // between enemy generating

    var _enemyConstructors = [
        {constructor: Recruit, weight: 10},
        {constructor: FootSoldier, weight: 5},
        {constructor: MachineGunner, weight: 2},
        {constructor: GuyWithPanzerschreck, weight: 1}
    ];
    _enemyConstructors.getFullWeight = function() {
        var weight = 0;
        for (var i = 0; i < this.length; i++) {
            weight += this[i].weight;
        }
        return weight;
    };

    var _creationTimer = null;

    self.startGenerating = function() {
        _creationTimer = setInterval(generate, _generatingDelay);
    };

    self.stopGenerating = function() {
        clearInterval(_creationTimer);
    };

    function generate() {
        _dynamicObjects.push(_enemyConstructors[getNextIndex()].constructor({
            stage: _stage,
            dynamicObjects: _dynamicObjects,
            bullets: _bullets,
            x: CANVAS_WIDTH * (random() / 2 + 0.5),
            y: CANVAS_HEIGHT * (random() / 2 + 0.5)
        }));
    }

    function getNextIndex() {
        var border = random() * _enemyConstructors.getFullWeight();
        var x = 0;
        for (var i = 0; i < _enemyConstructors.length; i++) {
            if (x <= border && x + _enemyConstructors[i].weight > border) {
                return i;
            }
            x += _enemyConstructors[i].weight;
        }
        return _enemyConstructors.length - 1;
    }

    return self;
}
