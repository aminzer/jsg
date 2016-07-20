var PLAYER = {
    HP: 20,
    SPEED: 3
};

var UNIT = {

    DEFAULT: {
        HP: 10,
        RADIUS: 20,
        SPEED: 1
    },

    TANK: {
        HP: 300
    },

    DESTROYER: {
        HP: 150,
        RADIUS: 30
    },

    WALL: {
        HP: 1000
    }
};

var BULLET = {

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

var WEAPON = {

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

var ENEMY_FACTORY = {

    DEFAULT: {
        GENERATING_DELAY: 2000
    }
};