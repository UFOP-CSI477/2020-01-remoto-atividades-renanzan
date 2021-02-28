const Hex = require("./Hex");
const getGradientColors = require("./getGradientColors");
const getPerlinColors = require("./getPerlinColors");
const initializeTerritory = require("./initializeTerritory");
const getDayPhase = require("./getDayPhase");
const getMoonPhase = require('./getMoonPhase');

function getGrid(size) {
    var grid = [];

    for(var i = 0; i < size; i += 1) {
        grid[i] = [];
        
        for(var j = 0; j < size; j += 1)
            grid[i][j] = Hex.convertOffsetToCube(i, j);
    }

    return grid;
}

function getRing(center, radius) {
    const results = []
    var cube = Hex.add(center, Hex.scale(Hex.create(-1, 1, 0), radius))
    
    for(var i = 0; i < 6; i += 1)
        for(var j = 0; j < radius; j += 1) {
            results.push(cube);
            cube = Hex.getNeighbour(cube, i);
        }

    return results;
};

function generateWorld(size, gradient, perlin) {
    const mapSize = (size || 50);
    const mapGradient = (gradient || 1);
    const mapPerlin = (perlin || 50)

    const grid = getGrid(size || 50); 
    
    const halfSize = Math.floor(mapSize / 2);
    const center = grid[halfSize][halfSize];

    var circles = [];
    for (var i = 1; i <= halfSize; i += 1)
        circles[i] = getRing(center, i);

    const gradientColors = getGradientColors(grid, circles, (mapGradient || 50));
    const perlinColors = getPerlinColors(grid, mapPerlin);

    return {
        info: {
            center
        },
        now: {
            timePhase: getDayPhase(),
            moonPhase: getMoonPhase()
        },
        grid: initializeTerritory(grid, gradientColors, perlinColors),
    };
}

module.exports = generateWorld;