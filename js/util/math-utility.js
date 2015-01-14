/**
 * supporting tool that provides functions to work with angles, directions, etc
 * @returns {{}}
 */
var MathUtility =  {
    /**
     * get angle between horizontal line passing through (x0,y0) and line [(x0,y0) - (x1,y1)]
     * @param x0 - first abscissa
     * @param y0 - last ordinate
     * @param x1 - last abscissa
     * @param y1 - last ordinate
     * @return number (angle in degrees)
     */
    getLinesAngle: function(x0, y0, x1, y1) {
        if (x0 == x1 && y0 == y1) {
            return 0;
        }

        if (x0 < x1) {
            return 180 / Math.PI * Math.asin( (y1 - y0) / Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2)) );
        }

        return 180 - 180 / Math.PI * Math.asin( (y1 - y0) / Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2)) );
    },

    /**
     * return true if (x,y) in in circle
     * @param circleX
     * @param circleY
     * @param circleRadius
     * @param x
     * @param y
     * @returns {boolean}
     */
    isInCircle: function(circleX, circleY, circleRadius, x, y) {
        return (circleX-x)*(circleX-x) + (circleY-y) * (circleY-y) <= circleRadius * circleRadius;
    }
};
