LevelStorage.add(2, {

    name: 'Just piece of cake',

    player: {
        x: 100,
        y: 100,
        weaponSet: new WeaponSet({
            weapons: [
                new GrandfathersGun({}, false),
                new AutomaticGun({}, false),
                new MachineGun({}, false),
                new RocketLauncher({}, false),
                new Mortar({}, false)
            ]
        })
    },

    player2: {
        x: 100,
        y: 200,
        weaponSet: new WeaponSet({
            weapons: [
                new GrandfathersGun({}, false),
                new AutomaticGun({}, false),
                new MachineGun({}, false),
                new RocketLauncher({}, false),
                new Mortar({}, false)
            ]
        })
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
