LevelStorage.add('Just piece of cake', {

    player: {
        x: 100,
        y: 100
    },

    enemies: [
        {
            constructor: Recruit,
            x: 1300,
            y: 600
        }, {
            constructor: Recruit,
            x: 1300,
            y: 700
        }, {
            constructor: FootSoldier,
            x: 1300,
            y: 800
        }
    ]
});
