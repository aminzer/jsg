var LevelResolver = function() {
    var SPECIAL_OPTION_PREFIX = '$';
    var PLAYER_PREFIX = 'player';

    function getObjectOpts(opts) {
        var res = {};
        for (var key in opts) {
            if (opts.hasOwnProperty(key) && key.charAt(0) != SPECIAL_OPTION_PREFIX) {
                res[key] = opts[key];
            }
        }
        return res;
    }

    function getPlayersDefinitions(level) {
        var players = [];
        for (var key in level) {
            if (level.hasOwnProperty(key) && key.indexOf(PLAYER_PREFIX) === 0) {
                players.push(level[key]);
            }
        }
        return players;
    }

    return {
        resolve: function(level) {
            getPlayersDefinitions(level).forEach(function(playerDef) {
                var constructor = playerDef.$constructor || Tommy;
                var player = new constructor(
                    getObjectOpts(playerDef)
                );
                player.setObjectType(OBJECT_TYPE.PLAYER);
                player.aimAt(Number.MAX_VALUE * cos_d(player.getAngle()), Number.MAX_VALUE * sin_d(player.getAngle()));
                _.addUnit(player);
                _.addPlayer(player);
            });

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
