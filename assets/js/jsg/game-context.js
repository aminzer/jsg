function GameContext(opts) {
    opts = opts || {};

    this._stage = new createjs.Stage(Canvas.id);

    this._bullets = opts.bullets || [];
    this._units = opts.units || [];
    this._players = opts.players || [];
    this._effects = opts.effects || [];
    this._enemyFactory = opts.enemyFactory || null;
}

new meta.Class( GameContext )

    .define_accessors([
        'stage',
        'bullets',
        'units',
        'effects',
        'enemyFactory'
    ])

    .define_accessors('players', {
        set: function (players) {
            this._players = players;
            players.forEach(function (player) {
                this.addUnit(player);
            })
        }
    })

    .define_methods({
        addBullet: function (bullet) {
            this._bullets.push(bullet);
        },

        addUnit: function (unit) {
            this._units.push(unit);
        },

        addPlayer: function (player) {
            this.addUnit(player);
            this._players.push(player);
        },

        addEffect: function (effect) {
            this._effects.push(effect);
        }
    })
;
