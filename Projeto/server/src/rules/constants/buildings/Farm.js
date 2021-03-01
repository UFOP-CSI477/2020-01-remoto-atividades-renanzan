const Build = require("./Build")
const calcBasedFactor = require("../../calculations/calcBasedFactor");

module.exports = new (class extends Build {
    #calcMaximumPopulation = (level) => {
        const base = 240;
        const factor = 1.172103;

        return calcBasedFactor(base, factor, level);
    };

    /**
     * @class
     */
    getDetails(level, hq) {
        const details = super.getDetails(level, hq);

        details.maximumPopulation = this.#calcMaximumPopulation(level);

        if(details.next)
            details.next.maximumPopulation = this.#calcMaximumPopulation(level+1);

        return details;
    }

    /**
     * @class
     */
    getCost(level, hq) {
        return {
            ...super.getCost(level, hq),
            maximumPopulation: this.#calcMaximumPopulation(level+1)
        };
    }

})(1, 30, 45, 40, 30, 0, 20, 5, 1.3, 1.32, 1.29, 1, 1.2);