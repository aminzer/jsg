function LevelDefinition(opts) {
    opts = opts || {};

    this._id = opts.id || null;
    this._name = opts.name || 'Unknown Level';
    this._description = opts.description || '';
}

new meta.Class( LevelDefinition )

    .define_accessors([
        'id',
        'name'
    ])

    .define_readers({
        players: function () {
            return [
                {
                    x: 400,
                    y: 450,
                    weaponSet: WeaponSet.full()
                }
            ];
        },

        enemies : function () { return [] },
        effects : function () { return [] },
        enemyFactory: function () { return null }
    })
;
