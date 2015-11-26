function DefaultHero2(opts, render) {
    opts = opts || {};

    this.setIfUndefined(opts, 'mainColor', '#FF860D');
    this.setIfUndefined(opts, 'extraColor', '#75420E');

    DefaultHero.call(this, opts);

    if (render !== false) {
        this.render();
    }
}

Extend(DefaultHero2).from(DefaultHero);
