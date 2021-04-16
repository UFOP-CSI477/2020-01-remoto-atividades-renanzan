import * as d3 from 'd3';

import { loadVillage } from './preloadAssets';

export default function renderVillage(parent, x, y) {
    const villateData = loadVillage();

    // d3.xml("assets/village.svg", function(data) {
        const height = 10;
        const width = 10;

        // console.log({
        //     villageData,
        //     documentElement: data.documentElement
        // });

        // d3.select(parent)
        //     .node().append(villageData);

        // d3.select(parent)
        //     .select("image")
        //     .attr("class", "TESTANDO-123");
        //     .attr("y", (y - (height/2)))
        //     .attr("x", (x - (width/2)))
        //     .attr("height", height)
        //     .attr("width", width)
        //     .style("pointer-events", "none");

        d3.select(parent)
            .append("svg:image")
            .attr("xlink:href", villateData.getAttributeNS('http://www.w3.org/1999/xlink', "href"))
            .attr("y", (y - (height/2)))
            .attr("x", (x - (width/2)))
            .attr("height", height)
            .attr("width", width)
            .style("pointer-events", "none");
    // });
}