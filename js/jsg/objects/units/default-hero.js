function DefaultHero(opts, render) {
    opts = new meta.Hash( opts ).merge({
        speed: PLAYER.SPEED,
        maxHp: PLAYER.HP,
        mainColor: '#73B500',
        extraColor: '#345200'
    }).to_obj();

    Tommy.call(this, opts, render);
}

new meta.Class( DefaultHero )

    .extend_from( Tommy )
;
