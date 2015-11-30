var RequestParams = (function() {
    var params = null;

    function parseURI() {
        if (params !== null) {
            return;
        }

        params = {};
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            // If first entry with this name
            if (typeof params[pair[0]] === "undefined") {
                params[pair[0]] = decodeURIComponent(pair[1]);
                // If second entry with this name
            } else if (typeof params[pair[0]] === "string") {
                params[pair[0]] = [params[pair[0]], decodeURIComponent(pair[1])];
                // If third or later entry with this name
            } else {
                params[pair[0]].push(decodeURIComponent(pair[1]));
            }
        }
        return params;
    }

    return {
        contains: function(key) {
            parseURI();
            return params.hasOwnProperty(key);
        },

        get: function(key) {
            parseURI();
            return this.contains(key) ? params[key] : null;
        }
    }
})();
