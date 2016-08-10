define(function () {
    return {
        DEFAULT: {
            FRONT_LENGTH: 30,
            HARDNESS: 500,
            MAX_SECTOR: 20,
            SHOOTING_DELAY: 300,
            AUTOMATIC: {
                RATE_OF_FIRE: 300
            }
        },

        MACHINE_GUN: {
            FRONT_LENGTH: 35,
            HARDNESS: 5000,
            MAX_SECTOR: 30,
            RATE_OF_FIRE: 850
        },

        ROCKET_LAUNCHER: {
            FRONT_LENGTH: 30,
            HARDNESS: 1000,
            MAX_SECTOR: 30,
            SHOOTING_DELAY: 1000
        },

        TANK_GUN: {
            FRONT_LENGTH: 100,
            HARDNESS: 1000,
            MAX_SECTOR: 5,
            SHOOTING_DELAY: 1500
        }
    };
});
