/**
 * supporting tool that provides functions to work with angles, directions, etc
 * @returns {Object}
 */
var MathUtility = {

    /**
     * converts angle in degrees to angle in radians
     * @param degreeAngle
     * @returns {number}
     */
    degToRad: function(degreeAngle) {
        return Math.PI / 180 * degreeAngle;
    },

    /**
     * converts angle in radians to angle in degrees
     * @param radianAngle
     * @returns {number}
     */
    radToDeg: function(radianAngle) {
        return 180 / Math.PI * radianAngle;
    },

    /**
     * set angle (deg) to range (-180, 180] (period = 360)
     * @param degreeAngle
     * @returns {number}
     */
    normalizeAngle: function(degreeAngle) {
        while (degreeAngle > 180) {
            degreeAngle -= 360;
        }

        while (degreeAngle <= -180) {
            degreeAngle += 360;
        }

        return degreeAngle;
    },

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
            return this.radToDeg(Math.asin( (y1 - y0) / this.getDistance(x0, y0, x1, y1) ));
        }

        return this.radToDeg(Math.PI - Math.asin( (y1 - y0) / this.getDistance(x0, y0, x1, y1) ));
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
     * @param angle - ray angle (deg)
     * @param circleX
     * @param circleY
     * @param circleRadius
     * @returns {boolean}
     */
    isRayPassThroughCircle : function(x, y, angle, circleX, circleY, circleRadius) {
        if (MathUtility.getDistance(x, y, circleX, circleY) == 0) {
            return true;
        }
        // TODO !! fix (from right like -174.41898218162044+-15.827344220736308 178.2138438281347)
        var basicAngle = this.getLinesAngle(x, y, circleX, circleY);     // between ray's start and circle center
        var deltaAngle = this.radToDeg(Math.asin(circleRadius / MathUtility.getDistance(x, y, circleX, circleY)));

        console.log(this.normalizeAngle(basicAngle) + "+-" + deltaAngle + " "  + this.normalizeAngle(angle));

        return Math.abs(this.normalizeAngle(angle) - this.normalizeAngle(basicAngle)) <= deltaAngle;
    }
};
