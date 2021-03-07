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
     * @param {Number} level - Current TimberCamp build level
     * @returns {Number} - Farm production
     */
    getProduction(level) {
        return calcResourceProduction(level);
    }
})(1, 30, 50, 60, 40, 5, 15, 6, 1.25, 1.275, 1.245, 1.155, 1.2);