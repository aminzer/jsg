function Effect(opts) {
    opts = opts || {};

    MovingObject.call(this, opts);

    this._active = this.def( opts.active, true );
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
