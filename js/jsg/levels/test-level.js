function TEST_LEVEL() {
    return {
        //enemies: [
        //    {
        //        constructor: Recruit,
        //        x: 70,
        //        y: 10
        //    }, {
        //        constructor: Recruit,
        //        x: 70,
        //        y: 20
        //    }, {
        //        constructor: FootSoldier,
        //        x: 75,
        //        y: 30
        //    }, {
        //        constructor: MachineGunner,
        //        x: 70,
        //        y: 40
        //    }, {
        //        constructor: GuyWithPanzerschreck,
        //        x: 80,
        //        y: 55
        //    }/*, {
        //        constructor: Tank,
        //        x: 50,
        //        y: 55,
        //        angle: -90
        //    }, {
        //        constructor: Wall,
        //        x: 20,
        //        y: 40
        //    }, {
        //        constructor: Wall,
        //        x: 20,
        //        y: 45
        //    }, {
        //        constructor: Wall,
        //        x: 20,
        //        y: 50
        //    }*/
        //],

        //effects: [
        //    {
        //        constructor: BulletReflectEffect,
        //        x: 40,
        //        y: 20,
        //        on: true
        //    }
        //],

        enemyFactory: {
            constructor: EnemyFactory,
            generatingDelay: 5000
        }
    };
}
