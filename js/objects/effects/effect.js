function Effect(opts) {
    var self = ShapedObject(opts);

    var _on = opts.on || false;

    self.on = function() {
        _on = true;
    };

    self.off = function() {
        _on = false;
    };

    self.haveInfluence = function() {
        return _on;
    };

    return self;
}
