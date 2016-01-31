function Sound(opts) {
    opts = opts || {};

    this._id = opts.id;
    this._src = opts.src;
}

Sound.prototype.getId = function() {
    return this._id;
};

Sound.prototype.setId = function(id) {
    this._id = id;
};

Sound.prototype.getSrc = function() {
    return this._src;
};

Sound.prototype.setSrc = function(src) {
    this._src = src;
};
