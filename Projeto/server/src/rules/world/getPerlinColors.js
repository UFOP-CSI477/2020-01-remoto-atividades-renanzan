const perlin = require('perlin');

function getPerlinColors(grid, intensity) {
      var colors = [];

      perlin.noise.seed(Math.random());

      for (var i = 0; i < grid.length; i += 1) {
        colors[i] = [];
        for (var j = 0; j < grid[i].length; j += 1) {
          var value = perlin.noise.simplex2(i / intensity, j / intensity);
          value *= 256;

          colors[i][j] = Math.round(Math.abs(value));
        }
      }

      return colors;
}

module.exports = getPerlinColors;