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

        this._players.add_mirror_for_adding(this._units);
        this._players.add_mirror_for_removing(this._units);
        this._units.add_mirror_for_removing(this._players);
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

        .define_static_property('instance', {
            get: function () {
                return this._instance || (this._instance = new GameContext());
            },
            set: function (newInstance) {
                this._instance = newInstance;
            }
        })

        .define_static_method({
            initialize: function() {
                return this.instance;
            }
        })
    ;

    module.exports = GameContext;
});
