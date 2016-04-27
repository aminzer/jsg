function BaseObject(opts) {
    opts = opts || {};
    this._id = UID.generate();
    this._objectType = this.def(opts.objectType, OBJECT_TYPE.UNDEFINED);
}

meta( BaseObject )

    .define_accessors([
        'id',
        'objectType'
    ])

    .define_methods({
        def: function (value, defaultValue) {
            if (typeof (value) !== 'undefined') {
                return value;
            }
            return defaultValue;
        },

        setIfUndefined: function (opts, key, defaultValue) {
            opts = opts || {};
            if (!opts.hasOwnProperty(key)) {
                opts[key] = defaultValue;
            }
        }
    })
;
