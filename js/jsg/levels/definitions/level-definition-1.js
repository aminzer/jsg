function LevelDefinition1() {
    LevelDefinition.call(this, {
        id: 1,
        name: 'Training Room',
        description: 'Try your ammunition in safe place before smashing you enemies'
    })
}

new meta.Class( LevelDefinition1 )

    .extend_from( LevelDefinition )

    .define_readers({
        players: function () {
            return [
                {
                    x: 400,
                    y: 450,
                    weaponSet: WeaponSet.full()
                }, {
                    x: 1200,
                    y: 450,
                    weaponSet: WeaponSet.full()
                }
            ];
        },

        effects: function () {
            return [
                {
                    $constructor: WindEffect,
                    x: 150,
                    y: 150
                }, {
                    $constructor: BulletReflectEffect,
                    x: 150,
                    y: 750
                }, {
                    $constructor: BulletReflectEffect,
                    x: 1450,
                    y: 750
                }, {
                    $constructor: BulletReflectEffect,
                    x: 1450,
                    y: 150
                }
            ];
        }
    })
;
