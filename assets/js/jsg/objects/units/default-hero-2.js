function DefaultHero2(opts, render) {
    opts = new meta.Hash( opts ).merge({
        mainColor: '#FF860D',
        extraColor: '#75420E'
    }).to_obj();

    DefaultHero.call(this, opts, render);
}

new meta.Class( DefaultHero2 )

    .extend_from( DefaultHero )
;
