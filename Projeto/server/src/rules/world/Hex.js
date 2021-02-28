const Hex = {
    create: function (x, y, z) {
        return {
            x: x,
            y: y,
            z: z
        };
    },

    add: function (a, b) {
        return Hex.create(a.x + b.x, a.y + b.y, a.z + b.z);
    },

    scale: function (a, k) {
        return Hex.create(a.x * k, a.y * k, a.z * k);
    },

    getNeighbour: function (hex, direction) {
        return Hex.add(hex, Hex.getDirection(direction));
    },

    getDirection: function (direction) {
        var directions = [
            new Hex.create(1, 0, -1),
            new Hex.create(1, -1, 0),
            new Hex.create(0, -1, 1),
            new Hex.create(-1, 0, 1),
            new Hex.create(-1, 1, 0),
            new Hex.create(0, 1, -1)
        ];
        return directions[direction];
    },

    getAllNeighbours: function (hex) {
        return [
            Hex.getNeighbour(hex, 0),
            Hex.getNeighbour(hex, 1),
            Hex.getNeighbour(hex, 2),
            Hex.getNeighbour(hex, 3),
            Hex.getNeighbour(hex, 4),
            Hex.getNeighbour(hex, 5)
        ];
    },

    convertOffsetToCube: function (col, row) {
        var x = col,
            z = (col % 2 === 0) ? row - (col + 1) / 2 : row - col / 2,
            y = -x - z;

        return Hex.round(Hex.create(x, y, z));
    },

    round: function (hex) {
        var x = Math.trunc(Math.round(hex.x)),
            y = Math.trunc(Math.round(hex.y)),
            z = Math.trunc(Math.round(hex.z)),
            xDiff = Math.abs(x - hex.x),
            yDiff = Math.abs(y - hex.y),
            zDiff = Math.abs(z - hex.z);

        if (xDiff > yDiff && xDiff > zDiff) {
            x = -y - z;
        } else {
            if (yDiff > zDiff) {
                y = -x - z;
            } else {
                z = -x - y;
            }
        }
        return Hex.create(x, y, z);
    },

    getLinedraw: function (a, b) {
        var distance = Hex.getDistance(a, b),
            results = [],
            step = 1.0 / Math.max(distance, 1),
            i;

        for (i = 0; i <= distance; i += 1) {
            results.push(Hex.round(Hex.lerp(a, b, step * i)));
        }

        return results;
    },

    getDistance: function (a, b) {
        return Hex.getLength(Hex.subtract(a, b));
    },

    subtract: function (a, b) {
        return Hex.create(a.x - b.x, a.y - b.y, a.z - b.z);
    },

    getLength: function (hex) {
        return Math.trunc((Math.abs(hex.x) + Math.abs(hex.y) + Math.abs(hex.z)) / 2);
    },

    lerp: function (a, b, t) {
        return Hex.create(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t, a.z + (b.z - a.z) * t);
    }
};

module.exports = Hex;