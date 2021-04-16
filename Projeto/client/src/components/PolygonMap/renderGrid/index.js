import * as d3 from 'd3';

import { setCurrentWorldConfig } from 'store/modules/world/actions';

import getCoordinates from '../utils/getCoordinates';
import { DefaultValues } from '../constants';

import renderVillage from './renderVillage';
import renderPolygon from './renderPolygon';

import DefaultPiece from '../core/Pieces/Default';

import onZoom from '../handlers/onZoom';
import renderRuler from './renderRuler';

export default async function renderMap(dispatch, data, element, config, onClickCell) {
    const { grid, info } = data;
    const { x, y } = info.center;

    var centerX;
    var centerY;
    var coordinates;

    if(config.center.x && config.center.y) {
        centerX = config.center.x;
        centerY = config.center.y;
    } else
        for(var i = 0; i < grid.length; i += 1)
            for(var j = 0; j < grid[i].length; j += 1) {
                if((grid[i][j].x === x && (grid[i][j].y === y))) {
                    coordinates = getCoordinates(i, j);

                    centerY = -(coordinates.y*config.scale.current)+(DefaultValues.map.height()/2);
                    centerX = -(coordinates.x*config.scale.current)+(DefaultValues.map.width()/2);
                    break;
                }
            }

    function onMapMove(x, y, zoom) {
        dispatch(setCurrentWorldConfig(
            { x: Number(x), y: Number(y) },
            { current: Number(zoom) }
        ));
    }

    //## Clean Polygons
    d3.select(element)
        .select("#map-frame")
            .selectAll("g")
                .remove();

    d3.select(element)
        .attr('time-phase', data.now.timePhase)
        .attr('moon-phase', data.now.moonPhase)
        .select('svg')
            .call(onZoom(({ x: centerX, y: centerY }), config, onMapMove));

    const piecesEl = d3.select(element).select('svg').select('g').append('g').attr('id', 'pieces').node();
    const grainyEl = d3.select(element).select('svg').select('g').append('g').attr('id', 'grainy').attr("style", "pointer-events: none;").node();
    
    renderRuler(centerX, centerY);

    d3.select(element)
        .select('svg')
            .select('g')
                .attr('transform',
                    `translate(${((centerX))}, ${((centerY))})` +
                    ` scale(${DefaultValues.scale.current(config?.scale?.current)})`);

    DefaultPiece(piecesEl, grainyEl, grid);

    // for(var i = 0; i < grid.length; i += 1)
    //     for(var j = 0; j < grid[i].length; j += 1) {
    //         const { x, y, radius } = getCoordinates(i, j);

    //         const cellMap = d3.select(piecesEl).append("g").node();

    //         // renderPolygon(cellMap, x, y, radius, cell, onClickCell);
    //         // renderHexagon(cellMap, x, y, radius, cell, onClickCell, grainyEl);
    //         DefaultPieces(piecesEl, grainyEl, cell, x, y);

    //         if(cell.village)
    //             renderVillage(cellMap, x, y);
    //     }
}