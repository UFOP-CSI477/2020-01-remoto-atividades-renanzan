/**
 * @returns {String} "forest" | "bush" | "field" | "coast"
 */
function getType(value) {
    if(value < 50)
        return "forest"; // Floresta
    if(value < 100)
        return "bush"; // Mato
    if(value < 150)
        return "field"; // Campo
    if(value < 180)
        return "coast"; // Litoral
    return "sea"; // Mar
}

function initializeTerritory(grid, gradient, perlin) {
    var map = JSON.parse(JSON.stringify(grid));

    for(var i = 0; i < grid.length; i += 1) {
        for (var j = 0; j < grid[i].length; j += 1) {
            var colorValue = perlin[i][j] + gradient[i][j];

            map[i][j].type = getType(colorValue);
        }
    }

    return map;
}

module.exports = initializeTerritory;