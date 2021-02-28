/**
 * @returns {String} "new-moon" | "waxing-crescent-moon" | "quarter-moon" | "waxing-gibbous-moon" | "full-moon" | "waning-gibbous-moon" | "last-quarter-moon" | "waning-crescent-moon"
 * @description Use to know the phase of the moon
 */
function getMoonPhase() {
    const now = new Date();
    var day = now.getDate();
    var month = now.getMonth();
    var year = now.getFullYear();

    var c = 0;
    var e = 0;
    var jd = 0;
    var b = 0;

    if (month < 3) {
        year--;
        month += 12;
    }

    ++month;

    c = 365.25 * year;
    e = 30.6 * month;

    //jd is total days elapsed
    jd = c + e + day - 694039.09;

    //divide by the moon cycle
    jd /= 29.5305882;

    //int(jd) -> b, take integer part of jd
    b = parseInt(jd);

    //subtract integer part to leave fractional part of original jd
    jd -= b;

    //scale fraction from 0-8 and round
    b = Math.round(jd * 8);

    if (b >= 8)
        b = 0; //0 and 8 are the same so turn 8 into 0

    switch (b) {
        case 0:
            return 'new-moon';
        case 1:
            return 'waxing-crescent-moon';
        case 2:
            return 'quarter-moon';
        case 3:
            return 'waxing-gibbous-moon';
        case 4:
            return 'full-moon';
        case 5:
            return 'waning-gibbous-moon';
        case 6:
            return 'last-quarter-moon';
        case 7:
            return 'waning-crescent-moon';
    }
}

module.exports = getMoonPhase;