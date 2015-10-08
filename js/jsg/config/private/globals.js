var OBJECT_TYPE = {
    UNDEFINED:  parseInt("0000000", 16),
    PLAYER:     parseInt("0000001", 16),
    ENEMY:      parseInt("0000002", 16),
    NEUTRAL:    parseInt("0000003", 16)
};

var PI = Math.PI;
var sin = Math.sin;
var cos = Math.cos;
var sin_d = function(x) { return sin(PI / 180 * x) };
var cos_d = function(x) { return cos(PI / 180 * x) };
var random = Math.random;
