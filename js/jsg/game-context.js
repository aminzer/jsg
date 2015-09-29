function GameContext(opts) {
    opts = opts || {};

    var canvasId = opts.canvasId || "canvas";

    this._canvas = document.getElementById(canvasId);
    this._stage = new createjs.Stage(canvasId);

    this._bullets = opts.bullets || [];
    this._units = opts.units || [];
    this._player = opts.player || null;
    this._effects = opts.effects || [];
}

GameContext.prototype.getCanvas = function() {
    return this._canvas;
};

GameContext.prototype.setCanvas = function(canvas) {
    this._canvas = canvas;
};

GameContext.prototype.getStage = function() {
    return this._stage;
};

GameContext.prototype.setStage = function(stage) {
    this._stage = stage;
};

GameContext.prototype.getBullets = function() {
    return this._bullets;
};

GameContext.prototype.setBullets = function(bullets) {
    this._bullets = bullets;
};

GameContext.prototype.addBullet = function(bullet) {
    this._bullets.push(bullet);
};

GameContext.prototype.getUnits = function() {
    return this._units;
};

GameContext.prototype.setUnits = function(units) {
    this._units = units;
};

GameContext.prototype.getPlayer = function() {
    return this._player;
};

GameContext.prototype.setPlayer = function(player) {
    this._player = player;
};

GameContext.prototype.getEffects = function() {
    return this._effects;
};

GameContext.prototype.setEffects = function(effects) {
    this._effects = effects;
};
