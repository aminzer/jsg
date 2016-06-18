function LevelDefinition_2() {
    LevelDefinition.call(this, {
        id: 2,
        name: 'Too easy',
        description: 'Warm-up level to taste real blood'
    })
}

new meta.Class( LevelDefinition_2 )

    .extend_from( LevelDefinition )

    .define_readers({
        players: function () {
            return [
                {
                    x: 100,
                    y: 100,
                    weaponSet: WeaponSet.full()
                }, {
                    x: 100,
                    y: 200,
                    weaponSet: WeaponSet.full()
                }
            ];
        },

        enemies: function () {
            return [
                {
                    $constructor: Recruit,
                    x: 1300,
                    y: 600
                }, {
                    $constructor: Recruit,
                    x: 1300,
                    y: 700
                }, {
                    $constructor: FootSoldier,
                    x: 1300,
                    y: 800
                }
            ];
        }
    })
;
