function LevelResolver(opts) {
    var self = {};

    var _stage = opts.stage;
    var _units = opts.units;
    var _bullets = opts.bullets;

    var _enemyFactory = null;

    self.resolve = function(level) {
        var enemies = level.enemies;
        for (var i = 0; i < enemies.length; i++) {
            _units.push(enemies[i].constructor({
                stage: _stage,
                bullets: _bullets,
                x: enemies[i].x * CANVAS_WIDTH / 100,
                y: enemies[i].y * CANVAS_HEIGHT / 100
            }));
        }

        if (level.enemyFactory) {
            _enemyFactory = level.enemyFactory.constructor({
                stage: _stage,
                units: _units,
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
