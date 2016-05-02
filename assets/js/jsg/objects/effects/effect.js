function Effect(opts) {
    opts = opts || {};

    MovingObject.call(this, opts);

    this._active = meta.common.first_defined( opts.active, true );
}

Extend(Effect).from(MovingObject);

Effect.prototype.activate = function() {
    this._active = true;
};

Effect.prototype.deactivate = function() {
    this._active = false;
};

Effect.prototype.isActive = function() {
    return this._active;
};

Effect.prototype.makeInfluence = function() {
    if (this.isActive()) {
        // do some stuff
    }
};
