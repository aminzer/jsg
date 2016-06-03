function Control(opts) {
    opts = opts || {};

    this._controlledObject = opts.controlledObject || gctx.players.to_arr()[0];
    this._cursor = opts.cursor || new Cursor();

    this._keyMap = opts.keyMap || CONTROLS.DEFAULT;
    this._properties = {};    // quick analog of _keyMap
}

new meta.Class( Control )

    .extend_from( ControlInterface )
    
    .define_accessors([
        'controlledObject',
        'cursor',
        'keyMap'
    ])
    
    .define_methods({
        isPressed: function (key) {
            return this._pressedKeys[this.getProperty(key)] === true;
        },

        getProperty: function (keyString, defaultValue) {
            if (this._properties.hasOwnProperty(keyString)) {
                return this._properties[keyString];
            }

            defaultValue = typeof defaultValue === 'undefined' ? -1 : defaultValue;
            var res = this.keyMap;
            var keys = keyString.split('.');
            for (var i = 0; i < keys.length; i++) {
                if (!res.hasOwnProperty(keys[i]) || res[keys[i]] === null) {
                    res = defaultValue;
                    break;
                }
                res = res[keys[i]];
            }
            this._properties[keyString] = res;
            return res;
        }
    })
;
