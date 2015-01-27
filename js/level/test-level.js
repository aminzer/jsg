var TEST_LEVEL = {
    enemies: [
        {
            constructor: Recruit,
            x: 70,
            y: 10
        }, {
            constructor: Recruit,
            x: 70,
            y: 20
        }, {
            constructor: FootSoldier,
            x: 75,
            y: 30
        }, {
            constructor: MachineGunner,
            x: 70,
            y: 40
        }, {
            constructor: GuyWithPanzerschreck,
            x: 80,
            y: 55
        }
    ],
    enemyFactory: {
        constructor: EnemyFactory,
        generatingDelay: 5000
    }
};
