const Build = require("./Build");
const calcBasedFactor = require("../../calculations/calcBasedFactor");

module.exports = new (class extends Build {
    #calcCapacity = (level) => {
        const base = 1000;
        const factor = 1.2294934;

        return calcBasedFactor(base, factor, level);
    };

    /**
     * @class
     */
    getDetails(level, hq) {
        const details = super.getDetails(level, hq);

        details.capacity = this.#calcCapacity(level);

        if(details.next)
            details.next.capacity = this.#calcCapacity(level+1);

        return details;
    }

    /**
     * @class
     */
    getCost(level, hq) {
        return {
            ...super.getCost(level, hq),
            capacity: this.#calcCapacity(level+1)
        };
    }
})(1, 30, 60, 50, 40, 0, 17, 6, 1.265, 1.27, 1.245, 1.15, 1.2);