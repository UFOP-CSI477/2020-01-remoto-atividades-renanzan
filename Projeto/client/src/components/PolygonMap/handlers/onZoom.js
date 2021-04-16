import * as d3 from 'd3';

import { DefaultValues } from '../constants';

import renderRuler from '../renderGrid/renderRuler';

var x, y, zoom;

export default function onZoom(center, config, func) {
    const zoomScale = DefaultValues.scale.current(config?.scale?.current);
    const zoomMinScale = DefaultValues.scale.min(config?.scale?.min);
    const zoomMaxScale = DefaultValues.scale.max(config?.scale?.max);

    var zoom = zoom = d3.behavior.zoom().translate([center.x, center.y]).scale(zoomScale);

    zoom.on('zoom', function () {
        d3.event.translate[0] = Math.floor(d3.event.translate[0]);
        d3.event.translate[1] = Math.floor(d3.event.translate[1]);

        x = d3.event.translate[0];
        y = d3.event.translate[1];
        zoom = d3.event.scale.toFixed(2);

        // if(x > 0)
        //     d3.event.translate[0] = 0;

        // if(y > 0)
        //     d3.event.translate[1] = 0;

        renderRuler(x, y);

        d3.select('g').attr('transform', 'translate(' + d3.event.translate + ')' + ' scale(' + zoom + ')');
    }).scaleExtent([zoomMinScale, zoomMaxScale]);

    zoom.on('zoomend', function () {
        if(typeof func === "function")
            func(x, y, zoom);
    });

    return zoom;
}