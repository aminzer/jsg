define(function (require, exports, module) {
    var meta        = require('meta'),
        createjs    = require('createjs'),
        OBJECT_TYPE = require('const/object-type');

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
    
    module.exports = BaseObject;
});
