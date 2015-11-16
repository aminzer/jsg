LevelStorage.add('Try your weapons', {

    player: {
        x: 800,
        y: 450
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
