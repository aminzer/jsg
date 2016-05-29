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
        resolve: function(opts) {
            var level = opts.level;
            var playerCount = opts.playerCount || 1;

            var playerDefs = getPlayersDefinitions(level);
            for (var i = 0; i < playerCount; i++) {
                var playerDef = playerDefs[i] || {$constructor: DefaultHero2};
                var constructor = playerDef.$constructor || (i === 0 ? DefaultHero : DefaultHero2);
                var player = new constructor(
                    getObjectOpts(playerDef)
                );
                player.objectType = OBJECT_TYPE.PLAYER;
                player.aimAt(Number.MAX_VALUE * cos_d(player.angle), Number.MAX_VALUE * sin_d(player.angle));
                _.addUnit(player);
                _.addPlayer(player);
            }

            if (level.enemies) {
                for (i = 0; i < level.enemies.length; i++) {
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
