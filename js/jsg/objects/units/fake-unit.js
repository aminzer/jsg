define(function (require, exports, module) {
    var meta = require('meta'),
        Unit = require('objects/units/unit');

    function FakeUnit() { Unit.call(this) }
    
    new meta.Class( FakeUnit )
    
        .extend_from( Unit )
    
        .define_static_method('instance', function () {
            FakeUnit._instance || (FakeUnit._instance = new FakeUnit());
            return FakeUnit._instance;
        })
    ;

    module.exports = FakeUnit;
});
