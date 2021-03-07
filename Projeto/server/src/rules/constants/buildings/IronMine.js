const Build = require("./Build")
const { calcResourceProduction } = require("../../calculations");

module.exports = new (class extends Build {    
    /**
     * @class
     */
    getDetails(level, hq) {
        const details = super.getDetails(level, hq);

        details.production = calcResourceProduction(level);

        if(details.next)
            details.next.production = calcResourceProduction(level+1);

        return details;
    }

    /**
     * @class
     */
    getCost(level, hq) {
        return {
            ...super.getCost(level, hq),
            production: calcResourceProduction(level+1)
        };
    }

    /**
     * @param {Number} level - Current IronMine build level
     * @returns {Number} - Farm production
     */
    getProduction(level) {
        return calcResourceProduction(level);
    }
})(1, 30, 75, 65, 70, 10, 18, 6, 1.252, 1.275, 1.24, 1.17, 1.2);