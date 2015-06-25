function SIMPLE_LEVEL() {
    return {
        enemies: [
            {
                constructor: Recruit,
                x: 70,
                y: 10
            }, {
                constructor: Recruit,
                x: 70,
                y: 50
            }, {
                constructor: FootSoldier,
                x: 65,
                y: 30
            }
        ]
    };
}
