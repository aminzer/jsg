define(function (require, exports, module) {
    var meta         = require('meta'),
        UNIT         = require('const/physics/unit'),
        SquareObject = require('objects/square-object'),
        Unit         = require('objects/units/unit');

    function SquareUnit(opts) {
        opts = new meta.Hash( opts).add_defaults({
            length: 2 * UNIT.DEFAULT.RADIUS,
            width: 2 * UNIT.DEFAULT.RADIUS
        }).to_obj();
    
        SquareObject.call(this, opts);
        Unit.call(this, opts);
    }
    
    new meta.Class( SquareUnit )
    
        .extend_from( Unit )
    
        .add_mixin( SquareObject )
    ;

    module.exports = SquareUnit;
});
