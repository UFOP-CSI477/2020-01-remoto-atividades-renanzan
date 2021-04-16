import * as d3 from "d3";

export default function renderRuler(x, y) {
    function appendLabel(id, value, size) {
        
        d3.select(id)
            .selectAll("label")
                .remove();

        for(var i = 0; i < size; i++)
            d3.select(id)
                .append("label")
                .text(Number(Number(value) + (50 * i)).toFixed(0));
    }

    const size = d3.select('#ruler-left').node().offsetHeight % 50;

    appendLabel("#ruler-top", x, size);
    appendLabel("#ruler-bottom", x, size);
    appendLabel("#ruler-left", y, size);
    appendLabel("#ruler-right", y, size);
}