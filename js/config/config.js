// =============================== public ================================
var FPS = 60;

// controls
var UP_BUTTON = 87;           // W
var DOWN_BUTTON = 83;         // S
var LEFT_BUTTON = 65;         // A
var RIGHT_BUTTON = 68;        // D
var FIX_WEAPON_BUTTON = 79;   // O
var LOG_BUTTON = 17;          // Ctrl
var PAUSE_BUTTON = 80;        // P
// =======================================================================

// =============================== private ===============================
var CANVAS_WIDTH = 0;
var CANVAS_HEIGHT = 0;

var NO_MOVEMENT = 'NO_MOVEMENT';

var OBJECT_TYPE_UNIT = parseInt("0001", 2);
var OBJECT_TYPE_ENEMY = parseInt("0010", 2);

var PI = Math.PI;
var sin = Math.sin;
var cos = Math.cos;
var sin_d = function(x) { return sin(PI / 180 * x) };
var cos_d = function(x) { return cos(PI / 180 * x) };
var random = Math.random;
// =======================================================================
