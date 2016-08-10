define(function () {
    return {
        DEFAULT: {
            DAMAGE: 1,
            SPEED: 12,
            LIFETIME: 50,
            ACCELERATION: 0.5,
            BEGIN_ACCELERATION_LIFETIME: 90,
            END_ACCELERATION_LIFETIME: 60
        },

        MACHINE_GUN: {
            DAMAGE: 2,
            SPEED: 15,
            LIFETIME: 50
        },

        ROCKET: {
            DAMAGE: 10,
            START_SPEED: 2,
            LIFETIME: 80,
            ACCELERATION: 0.5,
            BEGIN_ACCELERATION_LIFETIME: 70,
            END_ACCELERATION_LIFETIME: 40
        },

        EXPLOSIVE_ROCKET: {
            DAMAGE: 20,
            START_SPEED: 2,
            LIFETIME: 100,
            FRACTION_COUNT: 60,
            FRACTION_DAMAGE: 1.5,
            FRACTION_LIFETIME: 25
        },

        MINE: {
            DAMAGE: 10,
            FRACTION_COUNT: 50,
            FRACTION_DAMAGE: 1,
            FRACTION_LIFETIME: 10
        },

        MINE_DELIVERY: {
            DAMAGE: 0,
            START_SPEED: 18,
            LIFETIME: 50,
            ACCELERATION: -0.6,
            BEGIN_ACCELERATION_LIFETIME: 30,
            END_ACCELERATION_LIFETIME: 0
        }
    };
});
