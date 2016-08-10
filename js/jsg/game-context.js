define(function (require, exports, module) {
    var createjs = require('createjs'),
        Canvas   = require('widgets/canvas'),
        meta     = require('meta');

    function GameContext(opts) {
        opts = opts || {};

        this._stage = new createjs.Stage(Canvas.id);

        this._bullets = new meta.ObjectMap();
        this._units = new meta.ObjectMap();
        this._players = new meta.ObjectMap();
        this._effects = new meta.ObjectMap();
        this._enemyFactory = opts.enemyFactory || null;

        this._players.set_mirror_for_adding(this._units);
        this._players.set_mirror_for_removing(this._units);
        this._units.set_mirror_for_removing(this._players);
    }

    new meta.Class( GameContext )

        .define_accessors([
            'stage',
            'enemyFactory'
        ])

        .define_readers([
            'bullets',
            'units',
            'players',
            'effects'
        ])
    
        .define_static_method({         // TODO make static properties
            instance: function () {
                return GameContext._instance || (GameContext._instance = new GameContext());
            },
            
            setInstance: function(newInstance) {
                GameContext._instance = newInstance;
            }
        })
    ;

    module.exports = GameContext;
});
