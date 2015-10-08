function LevelResolver(opts) {
    opts = opts || {};

    this._enemyFactory = null;
}

LevelResolver.prototype.resolve = function (level) {
    if (level.player) {
        var playerDef = level.player;
        var player = new Player({
            x: playerDef.x || 0,
            y: playerDef.y || 0
        });
        gctx.setPlayer(player);
        gctx.getUnits().push(player);
    }

    if (level.enemies) {
        for (var i = 0; i < level.enemies.length; i++) {
            var enemyDef = level.enemies[i];
            gctx.getUnits().push(new enemyDef.constructor({
                x: enemyDef.x,
                y: enemyDef.y,
                angle: enemyDef.angle
            }));
        }
    }

    if (level.effects) {
        for (i = 0; i < level.effects.length; i++) {
            var effectDef = level.effects[i];
            gctx.getEffects().push(new effectDef.constructor({
                x: effectDef.x,
                y: effectDef.y,
                angle: effectDef.angle,
                active: effectDef.active
            }));
        }
    }

    if (level.enemyFactory) {
        var enemyFactoryDef = level.enemyFactory;
        this._enemyFactory = new enemyFactoryDef.constructor({
            generatingDelay: enemyFactoryDef.generatingDelay
        });
        this._enemyFactory.startGenerating();
    }
};

LevelResolver.prototype.startGenerating = function() {
    this._enemyFactory && this._enemyFactory.startGenerating();
};

LevelResolver.prototype.stopGenerating = function() {
    this._enemyFactory && this._enemyFactory.stopGenerating();
};
