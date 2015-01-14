// =============================== public ================================
var FPS = 60;

var UP_BUTTON = 87;     // W
var DOWN_BUTTON = 83;   // S
var LEFT_BUTTON = 65;   // A
var RIGHT_BUTTON = 68;  // D
// =======================================================================

// =============================== private ===============================
var PI = Math.PI;
var sin = Math.sin;
var cos = Math.cos;
var sin_d = function(x) { return sin(PI / 180 * x) };
var cos_d = function(x) { return cos(PI / 180 * x) };
var random = Math.random;

var NO_MOVEMENT = 'NO_MOVEMENT';
// =======================================================================
