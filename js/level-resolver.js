function LevelResolver(opts) {
    var self = {};

    var _stage = opts.stage;
    var _units = opts.units;
    var _effects = opts.effects;
    var _bullets = opts.bullets;

    var _enemyFactory = null;

    self.resolve = function(level) {
        var enemies = level.enemies;
        for (var i = 0; i < enemies.length; i++) {
            _units.push(enemies[i].constructor({
                stage: _stage,
                bullets: _bullets,
                x: enemies[i].x * CANVAS_WIDTH / 100,
                y: enemies[i].y * CANVAS_HEIGHT / 100,
                angle: enemies[i].angle
            }));
        }

        var effects = level.effects;
        for (i = 0; i < effects.length; i++) {
            _effects.push(effects[i].constructor({
                stage: _stage,
                bullets: _bullets,
                x: effects[i].x * CANVAS_WIDTH / 100,
                y: effects[i].y * CANVAS_HEIGHT / 100,
                angle: effects[i].angle,
                on: effects[i].on
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

    return self;
}
