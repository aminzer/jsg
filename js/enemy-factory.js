function EnemyFactory(opts) {
    var self = {};

    var _stage = opts.stage;
    var _dynamicObjects = opts.dynamicObjects;
    var _bullets = opts.bullets;

    var _enemyConstructors = [
        Recruit, FootSoldier, MachineGunner, GuyWithPanzerschreck
    ];

    var _creationTimer = null;

    self.startGenerating = function() {
        _creationTimer = setInterval(generate, 1000);
    };

    self.stopGenerating = function() {
        clearInterval(_creationTimer);
    };

    function generate() {
        var constructorIndex = Math.floor(random() * _enemyConstructors.length);
        _dynamicObjects.push(_enemyConstructors[constructorIndex]({
            stage: _stage,
            dynamicObjects: _dynamicObjects,
            bullets: _bullets,
            x: 1200 + random() * 300,
            y: 100 + random() * 600
        }));
    }

    return self;
}