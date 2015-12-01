function EnemyFactory(opts) {
    opts = opts || {};

    this._generatingDelay = opts.generatingDelay || ENEMY_FACTORY.DEFAULT.GENERATING_DELAY;
    this. _creationTimer = null;

    this._enemyConstructors = new RandomAccessArray([
        {element: Recruit, weight: 10},
        {element: FootSoldier, weight: 5},
        {element: MachineGunner, weight: 2},
        {element: GuyWithPanzerschreck, weight: 1}
    ]);
}

EnemyFactory.prototype.startGenerating = function() {
    var self = this;
    this._creationTimer = setInterval(function () {
        var constructor = self._enemyConstructors.get();
        _.addUnit(new constructor({
            x: Canvas.getVirtualWidth() * (random() / 2 + 0.5),
            y: Canvas.getVirtualHeight() * (random() / 2 + 0.5)
        }));
    }, this._generatingDelay);
};

EnemyFactory.prototype.stopGenerating = function() {
    clearInterval(this._creationTimer);
    this._creationTimer = null;
};

EnemyFactory.prototype.isGenerating = function() {
    return this._creationTimer !== null;
};
