LevelStorage.add('Try your weapons', {

    player: {
        x: 400,
        y: 450,
        arsenal: [
            new GrandfathersGun({}, false),
            new AutomaticGun({}, false),
            new MachineGun({}, false),
            new RocketLauncher({}, false),
            new Mortar({}, false)
        ]
    },

    effects: [
        {
            $constructor: BulletReflectEffect,
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
