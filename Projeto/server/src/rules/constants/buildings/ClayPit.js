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
     * @param {Number} level - Current ClayPit build level
     * @returns {Number} - Farm production
     */
    getProduction(level) {
        return calcResourceProduction(level);
    }
})(1, 30, 65, 50, 40, 10, 15, 6, 1.27, 1.265, 1.24, 1.14, 1.2);