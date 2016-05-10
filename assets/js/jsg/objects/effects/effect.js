function Effect(opts) {
    opts = opts || {};

    MovingObject.call(this, opts);

    this._active = meta.common.first_defined( opts.active, true );
}

meta.Class( Effect )

    .extend_from( MovingObject )

    .define_methods({
        activate: function () {
            this._active = true;
        },

        deactivate: function () {
            this._active = false;
        },

        isActive: function () {
            return this._active;
        },

        makeInfluence: function () {
            // do some stuff
        }
    })
;
