function getGradientColors(grid, circles, gradient) {
    var colors = [];

    for (var i = 0; i < grid.length; i += 1) {
        colors[i] = [];
        for (var j = 0; j < grid[i].length; j += 1) {
            var color = 255 * gradient;

            if (i === Math.floor(grid.length / 2) &&
                j === Math.floor(grid[i].length / 2)) {
                color = 0;
            } else {
                for (var ci = 1; ci < circles.length; ci += 1) {
                    for (var cj = 0; cj < circles[ci].length; cj += 1) {
                        if (circles[ci][cj].x === grid[i][j].x &&
                            circles[ci][cj].y === grid[i][j].y &&
                            circles[ci][cj].z === grid[i][j].z) {
                            color = Math.round(255 - (circles.length - ci) * 255 / circles.length) * gradient;
                        }
                    }
                }
            }
            colors[i][j] = color;
        }
    }
    return colors;
};

module.exports = getGradientColors;