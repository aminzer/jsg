define(function (require, exports, module) {
    var meta         = require('meta'),
        UNIT         = require('const/physics/unit'),
        CircleObject = require('objects/circle-object'),
        Unit         = require('objects/units/unit');

    function CircleUnit(opts) {
        opts = opts || {};
    
        CircleObject.call(this, opts);
        Unit.call(this, opts);
    
        this.radius = meta.common.first_defined( opts.radius, UNIT.DEFAULT.RADIUS );
    }
    
    new meta.Class( CircleUnit )
    
        .extend_from( Unit )
    
        .add_mixin( CircleObject )
    ;

    module.exports = CircleUnit;
});
