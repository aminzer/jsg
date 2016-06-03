var RequestParams = (function () {
    var params = null;

    function parseURI() {
        if (params) return;

        params = {};
        var query = window.location.search.substring(1);
        var keysWithValues = query.split('&');
        keysWithValues.forEach(function (keyWithValue) {
            var pair = keyWithValue.split('=');
            params[pair[0]] = decodeURIComponent(pair[1]);
        });
    }

    return {
        contains: function (key) {
            parseURI();
            return params.hasOwnProperty(key);
        },

        get: function (key, defaultValue) {
            defaultValue = defaultValue || null;
            parseURI();
            return this.contains(key) ? params[key] : defaultValue;
        }
    }
})();
