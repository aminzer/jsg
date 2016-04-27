var UID = {

    generate: function() {
        var res = '';
        for (var i = 0; i < 32; i++) {
            res += Math.floor(random() * 16).toString(16);
        }
        return res;
    }
};
