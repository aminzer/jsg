var TEST_LEVEL = {
    enemies: [
        {
            constructor: Recruit,
            x: 1000,
            y: 100
        }, {
            constructor: Recruit,
            x: 1000,
            y: 200
        }, {
            constructor: FootSoldier,
            x: 1100,
            y: 150
        }, {
            constructor: MachineGunner,
            x: 1100,
            y: 250
        }, {
            constructor: GuyWithPanzerschreck,
            x: 1100,
            y: 350
        }
    ],
    enemyFactory: {
        constructor: EnemyFactory,
        generatingDelay: 5000
    }
};
