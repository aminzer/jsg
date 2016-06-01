function EnemyFactory(opts) {
    opts = new meta.Hash( opts ).merge({
        enemyConstructors: new RandomAccessArray([
            {element: Recruit, weight: 10},
            {element: FootSoldier, weight: 5},
            {element: MachineGunner, weight: 2},
            {element: GuyWithPanzerschreck, weight: 1}
        ])
    }).to_obj();

    UnitFactory.call(this, opts);
}

new meta.Class( EnemyFactory )

    .extend_from( UnitFactory )
;
