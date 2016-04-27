function FootSoldier(opts, render) {
    opts = opts || {};

    this.setIfUndefined(opts, 'weaponSet', WeaponSet.oneGun(new AutomaticGun({}, false)));
    this.setIfUndefined(opts, 'mainColor', '#559');
    this.setIfUndefined(opts, 'extraColor', '#199EE0');

    Tommy.call(this, opts);

    if (render !== false) {
        this.render();
    }
}

Extend(FootSoldier).from(Tommy);
