/* exported identity */
/**
 * The default metric function: basically accepts an object and returns that object.
 * @method identity
 * @param  {[type]} value the object you want the identity of
 * @return {[type]}       the identity of that object (the same object that was sent in)
 */
const identity = (value) => value;

/**
 * Returns the top (first) element of the array
 * @method top
 * @param  {number} [index=0] the index of the top element, if it isn't at index 0
 * @return {[type]}           the element stored at the top of the array
 */
Array.prototype.top = function top(index = 0) {
    return this[this.length - 1 - index];
};

/**
 * Reverses the elements in an array, reversed array is a copy (not the original array).
 * @method reverse
 * @return {[type]} a copy of the array in reversed order
 */
Array.prototype.reverse = function reverse() {
    const result = [];
    for (let i = this.length; i--;) {
        result.push(this[i]);
    }
    return result;
};

/**
 * Returns the index of the minimum item in the array. The "minimum" is determed according to the metric() function.
 * @method indexOfMinimum
 * @param  {[type]}       [metric=identity] a function that accepts an object and returns a comparable value that should be measured (e.g., if comparing strings and string length was the metric to determine "minimum", then the metric function should accept a string and return its length)
 * @return {[number]}                       the index of the minimum element
 */
Array.prototype.indexOfMinimum = function indexOfMinimum(metric = identity) {
    let index = undefined;
    for (let i = this.length, minimum = Infinity; i--;) {
        const measure = metric(this[i]);
        if (measure <= minimum) {
            index = i;
            minimum = measure;
        }
    }
    return index;
};

/**
 * Removes an element at a specific index from the array and returns it
 * @method remove
 * @param  {[type]} index The element to remove
 * @return {[type]}       The removed element
 */
Array.prototype.remove = function remove(index) {
    return index >= 0 ? this.splice(index, 1)[0] : undefined;
};

/**
 * Removes an element from this array. Returns this array.
 * @method
 * @param  {[type]} element The element to remove.
 * @return {[type]}         This array.
 */
Array.prototype.delete = function (element) { // eslint-disable-line func-names, (reserved word)
    this.remove(this.indexOf(element));
    return this;
};