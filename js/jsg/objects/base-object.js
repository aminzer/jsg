function BaseObject(opts) {
    opts = opts || {};
    this._id = meta.common.first_defined( opts.id, createjs.UID.get() );
    this._objectType = meta.common.first_defined( opts.objectType, OBJECT_TYPE.UNDEFINED );
}

new meta.Class( BaseObject )

    .define_accessors([
        'id',
        'objectType'
    ])
;