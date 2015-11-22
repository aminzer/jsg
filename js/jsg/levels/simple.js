LevelStorage.add('Just piece of cake', {

    player: {
        x: 100,
        y: 100,
        arsenal: [
            new GrandfathersGun({}, false),
            new AutomaticGun({}, false),
            new MachineGun({}, false),
            new RocketLauncher({}, false),
            new Mortar({}, false)
        ]
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
