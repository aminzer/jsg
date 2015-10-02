var TypeUtility = {

    isDefined: function(v) {
        return typeof v !== 'undefined';
    },

    isFloat: function(v) {
        return !isNaN(parseFloat(v)) && isFinite(v);
    }
};
