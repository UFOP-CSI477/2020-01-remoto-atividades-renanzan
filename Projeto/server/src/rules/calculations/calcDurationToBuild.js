const dateFns = require("date-fns");

function getDuration(secounds) {
    const duration = dateFns.intervalToDuration({ start: 0, end: secounds * 1000 });

    for(const key of Object.keys(duration)) {
        if(duration[key] === 0)
            delete duration[key];
        else
            break;
    }

    var totalInSecounds = 0;
    var timeMeasure = 0;
    for(const key of Object.keys(duration).reverse()) {
        totalInSecounds += (duration[key] * Math.pow(60, timeMeasure));

        timeMeasure++;
    }

    return { ...duration, totalInSecounds };
}

/**
 * @param {Number} base - Base build time of build
 * @param {Number} factor - Factor build time of build
 * @param {Number} level - Next level build
 * @param {Number} hq - Current Headquarters level build
 * @returns {Object} - Duration to build
 */
module.exports = (base, factor, level, hq) => {
    const exponent = Math.max(-13, (level - 1 - 14 / (level-1)));
    const baseTime = base * 1.18 * Math.pow(factor, exponent);
    const timeSecounds = baseTime * Math.pow(1.05, - hq) * 60;

    return getDuration(timeSecounds);
}