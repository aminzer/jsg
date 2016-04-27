/**
 * RandomAccessArray based on Array
 * implements possibility of random access to it's elements
 *
 * example
 * var arr = new RandomAccessArray([
 * {element: "first", weight: 2},
 * {element: "second", weight: 1},
 * {element: "third", weight: 0.5}
 * ]);
 *
 * console.log(arr.get(0));         // fixed access
 * console.log(arr.getWeight(0));
 *
 * var count1 = 0;
 * var count2 = 0;
 * var count3 = 0;
 * for (var i = 0; i < 100; i++) {
 *    var tmp = arr.get();            // random access
 *    if (tmp == "first") {
 *        count1 ++;
 *    }
 *    if (tmp == "second") {
 *        count2 ++;
 *    }
 *    if (tmp == "third") {
 *        count3 ++;
 *   }
 * }
 * console.log(count1 + " " + count2 + " " + count3);
 */

function RandomAccessArray(weightArray) {
    if (weightArray) {
        this.construct(weightArray);
    }
}

RandomAccessArray.prototype = Object.create(Array.prototype);

/**
 * push current element with weight in array
 * @param weightElement - Object {element: *, weight: *}
 */
RandomAccessArray.prototype.push = function(weightElement) {
    if (!weightElement.hasOwnProperty('element')) {
        console.error("RandomAccessArray.push Error: cannot find property 'element' in pushed object");
        return;
    }
    if (!weightElement.hasOwnProperty('weight')) {
        console.error("RandomAccessArray.push Error: cannot find property 'weight' in pushed object");
        return;
    }
    Array.prototype.push.apply(this, arguments);
};

/**
 * fill array by elements with weights
 * @param weightArray - array with elements like {element: *, weight: *}
 */
RandomAccessArray.prototype.construct = function(weightArray) {
    for (var i = 0; i < weightArray.length; i++) {
        this.push(weightArray[i]);
    }
};

/**
 * get sum of weights of elements
 * @returns {number}
 * @private
 */
RandomAccessArray.prototype._getFullWeight = function() {
    var weight = 0;
    for (var i = 0; i < this.length; i++) {
        weight += this[i].weight;
    }
    return weight;
};

/**
 * get element by index without weight
 * @param index
 * @returns element
 */
RandomAccessArray.prototype.getByIndex = function(index) {
    if (index >= this.length || index < 0) {
        console.error("RandomAccessArray.get Error: index out of bounds");
        return null;
    }
    return this[index].element;
};

/**
 * get weight of element by index
 * @param index
 * @returns weight of element
 */
RandomAccessArray.prototype.getWeight = function(index) {
    if (index >= this.length || index < 0) {
        console.error("RandomAccessArray.getWeight Error: index out of bounds");
        return null;
    }
    return this[index].weight;
};

/**
 * get element by index (index defined) or random element (index undefined)
 * @param index
 * @returns {element}
 */
RandomAccessArray.prototype.get = function(index) {
    if (index !== undefined) {
        return this.getByIndex(index);
    }

    var border = Math.random() * this._getFullWeight();
    var current = 0;
    for (var i = 0; i < this.length; i++) {
        if (current <= border && current + this[i].weight > border) {
            return this.getByIndex(i);
        }
        current += this[i].weight;
    }
    return this.getByIndex(this.length - 1);
};
