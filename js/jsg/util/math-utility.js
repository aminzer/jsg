/**
 * supporting tool that provides functions to work with angles, directions, etc
 * @returns {Object}
 */
var MathUtility = {

    /**
     * get sign of number (-1 for negative x; 1 for positive; 0 for 0)
     * @param x
     * @returns {number}
     */
    sign: function(x) {
        return (x == 0) ? 0 : (x > 0 ? 1 : -1);
    },

    /**
     * converts angle in degrees to angle in radians
     * @param degreeAngle
     * @returns {number}
     */
    degToRad: function (degreeAngle) {
        return Math.PI / 180 * degreeAngle;
    },

    /**
     * converts angle in radians to angle in degrees
     * @param radianAngle
     * @returns {number}
     */
    radToDeg: function (radianAngle) {
        return 180 / Math.PI * radianAngle;
    },

    /**
     * set angle (deg) to range (-180, 180] (period = 360)
     * @param degreeAngle
     * @returns {number}
     */
    normalizeAngle: function (degreeAngle) {
        while (degreeAngle > 180) degreeAngle -= 360;
        while (degreeAngle <= -180) degreeAngle += 360;
        return degreeAngle;
    },

    /**
     * get absolute difference between 2 angles (deg)
     * angles order isn't important
     * @param angle1
     * @param angle2
     * @returns {number} number in range [0, 180)
     */
    absoluteAngleDifference: function (angle1, angle2) {
        return Math.abs(this.normalizeAngle(angle1 - angle2));
    },

    /**
     * true if faster to move in clockwise direction from startAngle to finishAngle than counterclockwise
     * @param startAngle
     * @param finishAngle
     * @returns {boolean}
     */
    isClockwiseDirection: function (startAngle, finishAngle) {
        return this.normalizeAngle(finishAngle - startAngle) > 0;
    },

    /**
     * get distance between two points
     * @param x0 - first abscissa
     * @param y0 - last ordinate
     * @param x1 - last abscissa
     * @param y1 - last ordinate
     * @return number (distance in px)
     */
    getDistance: function (x0, y0, x1, y1) {
        return Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));
    },

    /**
     * get angle between horizontal line passing through (x0,y0) and line [(x0,y0) - (x1,y1)]
     * @param x0 - first abscissa
     * @param y0 - last ordinate
     * @param x1 - last abscissa
     * @param y1 - last ordinate
     * @return number (angle in degrees)
     */
    getLinesAngle: function (x0, y0, x1, y1) {
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
    isInCircle: function (x, y, circleX, circleY, circleRadius) {
        return this.getDistance(x, y, circleX, circleY) <= circleRadius;
    },

    /**
     * return true if number x is between specified bounds (order of bounds not important)
     * @param x
     * @param bound1
     * @param bound2
     * @returns {boolean}
     */
    isBetween: function (x, bound1, bound2) {
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
    isRayPassThroughCircle : function (x, y, angle, circleX, circleY, circleRadius) {
        if (this.getDistance(x, y, circleX, circleY) == 0) {
            return true;
        }
        angle = this.normalizeAngle(angle);

        var basicAngle = this.normalizeAngle( this.getLinesAngle(x, y, circleX, circleY) );     // between ray's start and circle center
        var deltaAngle = this.radToDeg(Math.asin(circleRadius / this.getDistance(x, y, circleX, circleY)));

        // some magic
        if (this.normalizeAngle(basicAngle) - deltaAngle <= -180 && angle > 0) {    // critical angle near -180
            return Math.abs(angle - basicAngle - 360) <= deltaAngle;
        }
        if (this.normalizeAngle(basicAngle) + deltaAngle > 180 && angle < 0) {      // critical angle near 180
            return Math.abs(angle - basicAngle + 360) <= deltaAngle;
        }

        return Math.abs(angle - basicAngle) <= deltaAngle;
    },

    turnPointRelative: function (pointX, pointY, relativePointX, relativePointY, angle) {
        return {
            x: relativePointX + (pointX - relativePointX) * cos_d(angle) - (pointY - relativePointY) * sin_d(angle),
            y: relativePointY + (pointX - relativePointX) * sin_d(angle) + (pointY - relativePointY) * cos_d(angle)
        }
    },

    /**
     * get angle of ray after reflection from barrier
     * @param rayAngle (deg)
     * @param barrierAngle (deg)
     * @returns angle (deg)
     */
    getReflectAngle: function (rayAngle, barrierAngle) {
        // TODO implement
    }
};
