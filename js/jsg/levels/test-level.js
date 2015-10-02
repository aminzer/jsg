function TEST_LEVEL() {
    return {
        enemies: [
            {
                constructor: MachineGunner,
                x: 80,
                y: 20
            }, {
                constructor: Recruit,
                x: 70,
                y: 70
            }, {
                constructor: FootSoldier,
                x: 60,
                y: 50
            }, {
                constructor: GuyWithPanzerschreck,
                x: 70,
                y: 90
            }, {
                constructor: Destroyer,
                x: 70,
                y: 40
            }
        ],

        effects: [
            {
                constructor: BulletReflectEffect,
                x: 20,
                y: 80,
                active: true
            }
        ],

        enemyFactory: {
            constructor: EnemyFactory,
            generatingDelay: 2000
        }
    };
}
