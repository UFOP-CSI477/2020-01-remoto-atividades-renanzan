// BASEADO EM: https://forum.tribalwars.us/index.php?threads/guide-building-formulas.389/
const calcDurationToBuild = require("./calcDurationToBuild");

/**
 * @param {Number} hq - Headquarters building level
 * @param {Number} level - Construction level 
 * @param {Object} build - Building spec
 */
module.exports = (hq, level, build) => {
    const { wood, clay, iron, population, baseBuildTime, basePoints, factor } = build;
    const { wood: woodFactor, clay: clayFactor, iron: ironFactor, population: populationFactor, buildTime: buildTimeFactor } = factor;
    
    return ({
        level,
        requirements: {
            wood: Math.round(wood * Math.pow(woodFactor, (level-1))),
            clay: Math.round(clay * Math.pow(clayFactor, (level-1))),
            iron: Math.round(iron * Math.pow(ironFactor, (level-1)))
        },
        population: Math.round(population * Math.pow(populationFactor, (level-1))),
        points: Math.round(basePoints * Math.pow(1.2, (level-1))),
        durationToBuild: calcDurationToBuild(baseBuildTime, buildTimeFactor, (level-1), hq)
    });
};