const { getBuildLevelSpec, calcBasedFactor, calcBuildPoints, calcDurationToBuild } = require("../../calculations");

module.exports = class Build {
    #specs;

    /**
     * @param {Number} minLevel  - Minimum construction level
     * @param {Number} maxLevel - Maximum construction level
     * @param {Number} wood - Base cost of wood
     * @param {Number} clay - Base cost of clay
     * @param {Number} iron - Base cost of iron
     * @param {Number} population - Base of population
     * @param {Number} baseBuildTime - Base of build time
     * @param {Number} basePoints - Base of points
     * @param {Number} woodFactor - Factor of wood
     * @param {Number} clayFactor - Factor of clay
     * @param {Number} ironFactor - Factor of iron
     * @param {Number} populationFactor - Factor of population
     * @param {Number} buildTimeFactor - Factor of build time
     */
    constructor(
        minLevel, maxLevel,
        wood, clay, iron, population, baseBuildTime, basePoints,
        woodFactor, clayFactor, ironFactor, populationFactor, buildTimeFactor
    ) {
        this.#specs = {
            minLevel,
            maxLevel,
            wood,
            clay,
            iron,
            population,
            baseBuildTime,
            basePoints,
            factor: {
                wood: woodFactor,
                clay: clayFactor,
                iron: ironFactor,
                population: populationFactor,
                buildTime: buildTimeFactor
            }
        }
    }

    #levelIsValid = (level) => {
        return (level >= this.#specs.minLevel) && (level <= this.#specs.maxLevel);
    }

    /**
     * @param {Number} level - Current level build
     * @param {Number} hq - Headquarters building level
     * @returns {Object} - Details of build
     */
    getDetails(level, hq) {
        if(!this.#levelIsValid(level))
            return ({ message: "Invalid level of build" });

        const details = {};

        details.level = level;
        details.population = calcBasedFactor(this.#specs.population, this.#specs.factor.population, level);
        details.points = calcBuildPoints(this.#specs.basePoints, level);

        if(this.#levelIsValid(level+1)) {
            details.next = {
                level: (level+1),
                requirements: {
                    wood: calcBasedFactor(this.#specs.wood, this.#specs.factor.wood, (level+1)),
                    clay: calcBasedFactor(this.#specs.clay, this.#specs.factor.clay, (level+1)),
                    iron: calcBasedFactor(this.#specs.iron, this.#specs.factor.iron, (level+1)),
                    population: calcBasedFactor(this.#specs.population, this.#specs.factor.population, (level+1))
                },
                points: calcBuildPoints(this.#specs.basePoints, (level+1))
            }

            if(hq)
                details.next.durationToBuild = calcDurationToBuild(this.#specs.baseBuildTime, this.#specs.factor.buildTime, (level+1), hq);
        }

        return details;
    };

    /**
     * @returns {Object} - Build specs
     */
    getSpecs() {
        return this.#specs;
    }

    /**
     * @param {Number} level - Build current level
     * @param {Number} hq - Headquarters building level
     */
    getCost(level, hq) {
        return getBuildLevelSpec(hq, (level+1), this.#specs);
    }
}