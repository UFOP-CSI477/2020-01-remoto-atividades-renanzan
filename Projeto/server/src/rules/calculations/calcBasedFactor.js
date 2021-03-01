/**
 * @param {Number} base - Base value of build
 * @param {Number} factor - Factor value of build
 * @param {Number} level - Current level build
 */
module.exports = function(base, factor, level) {
    if(level <= 0)
        return 0;

    return Math.round(base * Math.pow(factor, level - 1));
}