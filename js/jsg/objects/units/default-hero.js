function DefaultHero(opts, render) {
    opts = opts || {};

    this.setIfUndefined(opts, 'speed', PLAYER.SPEED);
    this.setIfUndefined(opts, 'maxHp', PLAYER.HP);
    this.setIfUndefined(opts, 'mainColor', '#73B500');
    this.setIfUndefined(opts, 'extraColor', '#345200');

    Tommy.call(this, opts);

    if (render !== false) {
        this.render();
    }
}

Extend(DefaultHero).from(Tommy);
