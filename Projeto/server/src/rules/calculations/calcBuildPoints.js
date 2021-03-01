module.exports = function getResourcesProduction(base, level) {
    const factor = 1.2;

    if(level <= 0)
        return 0;

    return Math.round(base * Math.pow(factor, level - 1));
}