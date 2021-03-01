const MapTypes = require('../constants/MapTypes');

function getAvailablePositionsMap(grid) {
    var availablePositions = [];

    for(const i in grid)
        for(const j in grid[i]) {
            const cell = grid[i][j];

            if(cell.type !== MapTypes.SEA)
                if(!cell.village) 
                    availablePositions.push(cell);
        }

    return availablePositions;
}

module.exports = getAvailablePositionsMap;