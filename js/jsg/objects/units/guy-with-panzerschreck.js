function GuyWithPanzerschreck(opts, render) {
    opts = opts || {};

    this.setIfUndefined(opts, 'weaponSet', WeaponSet.oneGun(new RocketLauncher({}, false)));
    this.setIfUndefined(opts, 'mainColor', '#8D91E3');
    this.setIfUndefined(opts, 'extraColor', '#34378A');

    Tommy.call(this, opts);

    if (render !== false) {
        this.render();
    }
}

Extend(GuyWithPanzerschreck).from(Tommy);
