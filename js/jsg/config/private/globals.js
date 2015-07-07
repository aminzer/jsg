var CANVAS_WIDTH = 0;
var CANVAS_HEIGHT = 0;

var NO_MOVEMENT = 'NO_MOVEMENT';

var UNIT_TYPE = {
    PLAYER: parseInt("0001", 2),
    ENEMY: parseInt("0010", 2),
    NEUTRAL: parseInt("0011", 2)
};

var PI = Math.PI;
var sin = Math.sin;
var cos = Math.cos;
var sin_d = function(x) { return sin(PI / 180 * x) };
var cos_d = function(x) { return cos(PI / 180 * x) };
var random = Math.random;
