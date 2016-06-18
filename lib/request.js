var Request = (function () {
    var _basePath = null;
    var _params = null;

    function parseURI() {
        if (_params) return;

        _basePath = location.protocol + '//' + location.host + location.pathname;

        _params = {};
        var query = window.location.search.substring(1);
        var keysWithValues = query.split('&');
        keysWithValues.forEach(function (keyWithValue) {
            var pair = keyWithValue.split('=');
            _params[pair[0]] = decodeURIComponent(pair[1]);
        });
    }

    return {
        getBasePath: function (params) {
            var keyValueArr = [];
            Object.keys(params || {}).forEach(function (key) {
                keyValueArr.push(key + '=' + params[key]);
            });
            return keyValueArr.length ? _basePath + '?' + keyValueArr.join('&') : _basePath;
        },

        hasParam: function (key) {
            parseURI();
            return _params.hasOwnProperty(key);
        },

        getParam: function (key, defaultValue) {
            defaultValue = defaultValue || null;
            parseURI();
            return this.hasParam(key) ? _params[key] : defaultValue;
        }
    }
})();
