define(function (require, exports, module) {
    var meta        = require('meta'),
        DefaultHero = require('objects/units/default-hero');

    function DefaultHero2(opts, render) {
        opts = new meta.Hash( opts ).add_defaults({
            mainColor: '#FF860D',
            extraColor: '#75420E'
        }).to_obj();
    
        DefaultHero.call(this, opts, render);
    }
    
    new meta.Class( DefaultHero2 )
    
        .extend_from( DefaultHero )
    ;

    module.exports = DefaultHero2;
});
