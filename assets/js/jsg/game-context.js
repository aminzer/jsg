function GameContext(opts) {
    opts = opts || {};                              // TODO fix incorrect behaviour for froEach loops

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
