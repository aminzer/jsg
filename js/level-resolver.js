function LevelResolver(opts) {
    var self = {};

    var _stage = opts.stage;
    var _dynamicObjects = opts.dynamicObjects;
    var _bullets = opts.bullets;

    var _enemyFactory = null;

    self.resolve = function(level) {
        var enemies = level.enemies;
        for (var i = 0; i < enemies.length; i++) {
            _dynamicObjects.push(enemies[i].constructor({
                stage: _stage,
                dynamicObjects: _dynamicObjects,
                bullets: _bullets,
                x: enemies[i].x,
                y: enemies[i].y
            }));
        }

        if (level.enemyFactory) {
            _enemyFactory = level.enemyFactory.constructor({
                stage: _stage,
                dynamicObjects: _dynamicObjects,
                bullets: _bullets,
                generatingDelay: level.enemyFactory.generatingDelay
            });
            _enemyFactory.startGenerating();
        }
    };

    self.startGenerating = function() {
        _enemyFactory && _enemyFactory.startGenerating();
    };

    self.stopGenerating = function() {
        _enemyFactory && _enemyFactory.stopGenerating();
    };

    self.toggleGenerating = function() {
        if (_enemyFactory.isGenerating()) {
            _enemyFactory.stopGenerating()
        } else {
            _enemyFactory.startGenerating();
        }
    };

    return self;
}