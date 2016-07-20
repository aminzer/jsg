var CONTROLS = {

    COMMON: {
        MENU: KEY.ESC
    },

    DEFAULT : {
        MOVE: {
            UP: KEY.W,
            DOWN: KEY.S,
            LEFT: KEY.A,
            RIGHT: KEY.D
        },

        CURSOR: {
            MOUSE: true
        },

        HUCK: {
            FIX_WEAPON: KEY.O
        }
    },

    PLAYER1: {
        MOVE: {
            UP: KEY.UP_ARROW,
            DOWN: KEY.DOWN_ARROW,
            LEFT: KEY.LEFT_ARROW,
            RIGHT: KEY.RIGHT_ARROW
        },

        CURSOR: {
            MOUSE: true
        },

        HUCK: {
            FIX_WEAPON: KEY.O
        }
    },

    PLAYER2: {
        MOVE: {
            UP: KEY.W,
            DOWN: KEY.S,
            LEFT: KEY.A,
            RIGHT: KEY.D
        },

        CURSOR: {
            UP: KEY.I,
            DOWN: KEY.K,
            LEFT: KEY.J,
            RIGHT: KEY.L,
            SENSITIVITY: 10
        },

        WEAPON: {
            SHOOT: KEY.SPACE,
            NEXT_WEAPON: KEY.NUM_9,
            PREV_WEAPON: KEY.NUM_8
        },

        HUCK: {
            FIX_WEAPON: KEY.O
        }
    }
};
