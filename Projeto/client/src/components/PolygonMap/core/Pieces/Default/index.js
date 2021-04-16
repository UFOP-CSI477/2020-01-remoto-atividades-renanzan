import * as d3 from 'd3';

import { Sizes } from '../../../constants';
import getCoordinates from '../../../utils/getCoordinates';

import { loadPieces, loadGrainy } from './loadAssets';
import renderGrainy from './renderGrainy';

function renderVillage(cellElement, cell, coordinates, Grainy) {
    if(!cell?.village)
        return;

    const width = Sizes.cellMap;
    const height = width * Math.sqrt(3) / 2;
    const size = 20;

    const villageElement = d3.select(cellElement)
        .append("svg:image")
        .attr("y", (coordinates.y + (height/2)) - (size/2))
        .attr("x", (coordinates.x + (width/2)) - (size/2))
        .attr("height", size)
        .attr("width", size)
        .style("pointer-events", "none");

    Grainy.setAttr(villageElement, Grainy.village[5]);
}

export default function DefaultPiece(piecesContainer, grainyContainer, grid) {
    const Pieces = loadPieces(document);
    const Grainy = loadGrainy(document);

    function renderCell(cellElement, cell, { x, y }) {
        const width = Sizes.cellMap;
        const height = width * Math.sqrt(3) / 2;

        const pieceElement = d3.select(cellElement)
            .append("svg:image")
            .attr("x", x)
            .attr("y", y)
            .attr("height", height)
            .attr("width", width)
            .attr("class", "cell-map");

        Pieces.setAttr(pieceElement, Pieces[cell.type]);
    }

    function render() {
        for(var i=0; i < grid.length; i++)
            for(var j=0; j < grid[i].length; j++) {
                const coordinates = getCoordinates(i, j);
                
                const cellElement = d3.select(piecesContainer).append("g").node();

                renderCell(cellElement, grid[i][j], coordinates);
                renderVillage(cellElement, grid[i][j], coordinates, Grainy);
                renderGrainy(grainyContainer, grid[i][j], coordinates, Grainy);
            }
    }

    render();
}