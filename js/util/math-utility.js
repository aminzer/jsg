/**
 * supporting tool that provides functions to work with angles, directions, etc
 * @returns {Object}
 */
var MathUtility =  {

    /**
     * get distance between two points
     * @param x0 - first abscissa
     * @param y0 - last ordinate
     * @param x1 - last abscissa
     * @param y1 - last ordinate
     * @return number (distance in px)
     */
    getDistance: function(x0, y0, x1, y1) {
        return Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
    },

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
            return 180 / Math.PI * Math.asin( (y1 - y0) / this.getDistance(x0, y0, x1, y1) );
        }

        return 180 - 180 / Math.PI * Math.asin( (y1 - y0) / this.getDistance(x0, y0, x1, y1) );
    },

    /**
     * return true if point (x,y) is in circle(circleX,circleY,circleRadius)
     * @param x
     * @param y
     * @param circleX
     * @param circleY
     * @param circleRadius
     * @returns {boolean}
     */
    isInCircle: function(x, y, circleX, circleY, circleRadius) {
        return (circleX-x)*(circleX-x) + (circleY-y) * (circleY-y) <= circleRadius * circleRadius;
    },

    /**
     * return true if number x is between specified bounds (order of bounds not important)
     * @param x
     * @param bound1
     * @param bound2
     * @returns {boolean}
     */
    isBetween: function(x, bound1, bound2) {
        return (bound1 <= x && x <= bound2) || (bound2 <= x && x <= bound1);
    },

    /**
     * return true if ray(x,y,angle) pass through circle(circleX,circleY,circleRadius)
     * @param x - ray start
     * @param y - ray start
     * @param angle - ray angle
     * @param circleX
     * @param circleY
     * @param circleRadius
     * @returns {boolean}
     */
    isRayPassThroughCircle : function(x, y, angle, circleX, circleY, circleRadius) {
        // TODO !! find mistake
        var basicAngle = this.getLinesAngle(x, y, circleX, circleY);     // between ray's start and circle center
        // TODO check zero distance
        var deltaAngle = Math.acos(circleRadius / MathUtility.getDistance(x, y, circleX, circleY));

        return Math.abs(angle - basicAngle) <= deltaAngle;
    }
};
