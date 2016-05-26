LevelStorage.add(1, {

    name: 'Try your weapons',

    player1: {
        x: 400,
        y: 450,
        angle: 180,
        weaponSet: WeaponSet.full()
    },

    player2: {
        x: 1200,
        y: 450,
        angle: 0,
        weaponSet: WeaponSet.full()
    },

    effects: [
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
    ]
});
