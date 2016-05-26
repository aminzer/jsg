LevelStorage.add(2, {

    name: 'Just piece of cake',

    player: {
        x: 100,
        y: 100,
        weaponSet: WeaponSet.full()
    },

    player2: {
        x: 100,
        y: 200,
        weaponSet: WeaponSet.full()
    },

    enemies: [
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
    ]
});
