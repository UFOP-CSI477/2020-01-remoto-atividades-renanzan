/**
 * @return {String} "morning" | "evening" | "night" | "dawn" 
 */
function getDayPhase() {
    const now = new Date();
    const nowHours = now.getHours();
    const nowMinutes = now.getMinutes();

    // Período da manhã: [06:00] ~ [11:59]
    if(nowHours > 6 && (nowHours <= 11 && nowMinutes <= 59))
        return "morning";

    // Período da tarde: [12:00] ~ [17:59]
    if(nowHours >= 12 && (nowHours <= 17 && nowMinutes <= 59))
        return "evening";

    // Período da noite: [18:00] ~ [23:59]
    if(nowHours >= 18 && (nowHours <= 23 && nowMinutes <= 59))
        return "night";

    // Período da madrugada: [00:00] ~ [05:59]
    return "dawn";
}

module.exports = getDayPhase;