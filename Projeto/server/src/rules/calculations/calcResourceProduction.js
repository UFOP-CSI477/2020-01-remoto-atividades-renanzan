module.exports = function getResourcesProduction(level) {
    const factor = 1.163118;
    
    return Math.round(30 * Math.pow(factor, level - 1));
}