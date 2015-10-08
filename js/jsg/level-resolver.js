var LevelResolver = function() {
    return {
        resolve: function(level) {
            if (level.player) {
                var playerDef = level.player;
                var player = new Player({
                    x: playerDef.x || 0,
                    y: playerDef.y || 0
                });
                _.addUnit(player);
                _.setPlayer(player);
            }

            if (level.enemies) {
                for (var i = 0; i < level.enemies.length; i++) {
                    var enemyDef = level.enemies[i];
                    _.addUnit(new enemyDef.constructor({
                        x: enemyDef.x,
                        y: enemyDef.y,
                        angle: enemyDef.angle
                    }));
                }
            }

            if (level.effects) {
                for (i = 0; i < level.effects.length; i++) {
                    var effectDef = level.effects[i];
                    _.addEffect(new effectDef.constructor({
                        x: effectDef.x,
                        y: effectDef.y,
                        angle: effectDef.angle,
                        active: effectDef.active
                    }));
                }
            }

            if (level.enemyFactory) {
                var enemyFactoryDef = level.enemyFactory;
                var enemyFactory = new enemyFactoryDef.constructor({
                    generatingDelay: enemyFactoryDef.generatingDelay
                });
                _.setEnemyFactory(enemyFactory);
                enemyFactory.startGenerating();
            }
        }
    }
}();
