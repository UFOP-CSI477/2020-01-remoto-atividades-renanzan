import * as d3 from 'd3';

import { Colors, DefaultValues } from './constants';

export default function initializeMap(element, size) {
    const mapHeight = size || DefaultValues.map.height();
    const mapWidth = size || DefaultValues.map.width();

    if(d3.selectAll("#map-frame")[0].length > 0)
        return;

    d3.select(element)
        .append('svg')
            .attr('height', mapHeight)
            .attr('width', mapWidth)
            .append('rect')
                .attr('height', '100%')
                .attr('width', '100%')
                .attr('fill', Colors.mapFill);

    d3.select(element)
        .select('svg')
            .append('g')
            .attr("id", "map-frame");
}