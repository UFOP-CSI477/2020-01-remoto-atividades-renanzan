import * as d3 from 'd3';

import { Colors } from '../constants';
import getHexagonPoints from '../utils/getHexagonPoints';

export default function renderPolygon(parent, x, y, radius, cell, onClick) {
    d3.select(parent)
        .append('polygon')
        .attr('points', getHexagonPoints(x, y, radius).points)
        .attr('fill', Colors[cell.type])
        .on("click", function() {
            if(typeof onClick === "function")
                onClick(cell);
        });

    d3.select(parent)
        .append("text")
        .attr("x", x)
        .attr("y", y)
            .text(`${Number(cell.x).toFixed(0)}, ${Number(cell.y).toFixed(0)}`)
            .style("font", "normal 3px sans-serif")
            .style("transform", "translateX(-6px) translateY(1px)");
        
}