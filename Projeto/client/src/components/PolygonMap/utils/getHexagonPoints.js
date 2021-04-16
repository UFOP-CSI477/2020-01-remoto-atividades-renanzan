export default function getHexagonPoints(x, y, radius) {
    var points = [],
        i,
        angleDeg,
        angleRad,
        pointX,
        pointY;

    for (i = 0; i < 6; i += 1) {
        angleDeg = 60 * i;
        angleRad = Math.PI / 180 * angleDeg;

        pointX = x + radius * Math.cos(angleRad);
        pointY = y + radius * Math.sin(angleRad);

        points.push([pointX, pointY]);
    }

    const center = [
        ((points[0][0] + points[3][0])/2),
        ((points[0][1] + points[3][1])/2)
    ];

    return { points, center };
};