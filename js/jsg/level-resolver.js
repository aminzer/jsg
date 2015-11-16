var LevelResolver = function() {
    var SPECIAL_OPTION_PREFIX = '$';

    function getObjectOpts(opts) {
        var res = {};
        for (var key in opts) {
            if (opts.hasOwnProperty(key) && key.charAt(0) != SPECIAL_OPTION_PREFIX) {
                res[key] = opts[key];
            }
        }
        return res;
    }

    return {
        resolve: function(level) {
            if (level.player) {
                var player = new Player(
                    getObjectOpts(level.player)
                );
                _.addUnit(player);
                _.setPlayer(player);
            }

            if (level.enemies) {
                for (var i = 0; i < level.enemies.length; i++) {
                    _.addUnit(new level.enemies[i].$constructor(
                        getObjectOpts(level.enemies[i])
                    ));
                }
            }

            if (level.effects) {
                for (i = 0; i < level.effects.length; i++) {
                    _.addEffect(new level.effects[i].$constructor(
                        getObjectOpts(level.effects[i])
                    ));
                }
            }

            if (level.enemyFactory) {
                var enemyFactoryDef = level.enemyFactory;
                var enemyFactory = new enemyFactoryDef.$constructor(
                    getObjectOpts(level.enemyFactory)
                );
                _.setEnemyFactory(enemyFactory);
                enemyFactory.startGenerating();
            }
        }
    }
}();
