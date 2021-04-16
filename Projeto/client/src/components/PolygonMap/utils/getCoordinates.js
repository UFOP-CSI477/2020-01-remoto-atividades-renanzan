import { Sizes } from '../constants';

export default function getCoordinates(i, j) {
    const width = Sizes.cellMap;
    const height = width * Math.sqrt(3) / 2;
    const radius = width / 2;

    return {
        x: (width * 3 / 4 * (i + 1)),
        y: (i % 2 !== 0) ? (radius * Math.sqrt(3) / 2 + height * j) : height * j,
        height,
        width,
        radius
    };
}