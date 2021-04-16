import * as d3 from 'd3';

import { Sizes } from '../../../constants';

const width = Sizes.cellMap;
const height = width * Math.sqrt(3) / 2;

function grainyPines(grainyContainer, type, coordinates, Grainy) {
    if(type !== "forest" && type !== "bush")
        return;
    
    var countPine;
    
    if(type === "forest")
        countPine = Math.floor(Math.random() * (5 - 2 + 1)) + 2;
    else
        countPine = Math.floor(Math.random() * (2 - 0 + 1)) + 0;

    for(var count = 0; count < countPine; count++) {
        const randAsset = Math.floor(Math.random() * (8 - 1 + 1) + 1);
        var xOffset, yOffset, sizeOffset;
        
        if(type === "forest") {
            xOffset = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
            yOffset = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
            sizeOffset = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
        } else {
            xOffset = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
            yOffset = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
            sizeOffset = Math.floor(Math.random() * (5 - 0 + 1)) + 0;
        }

        const pineElement = d3.select(grainyContainer)
            .append("svg:image")
            .attr("x", coordinates.x-(width/2)+xOffset)
            .attr("y", coordinates.y-(height/2)+yOffset)
            .attr("height", 12+sizeOffset)
            .attr("width", 12+sizeOffset);

        Grainy.setAttr(pineElement, Grainy.tree.pine[randAsset]);
    }
}

function grainyRocks(grainyContainer, type, coordinates, Grainy) {
    if(type !== "field")
        return;

    if((Math.floor(Math.random() * (5 - 0 + 1)) + 0) !== 5)
        return;

    const countRocks = Math.floor(Math.random() * (3 - 1 + 1)) + 0;

    for(var count = 0; count < countRocks; count++) {
        const randAsset = Math.floor(Math.random() * (5 - 1 + 1) + 1);
        const sizeOffset = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
        const xOffset = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
        const yOffset = Math.floor(Math.random() * (5 - 1 + 1)) + 1;

        const rockElement = d3.select(grainyContainer)
            .append("svg:image")
            .attr("x", coordinates.x-(width/2)+xOffset)
            .attr("y", coordinates.y-(height/2)+yOffset)
            .attr("height", 12 + sizeOffset)
            .attr("width", 12 + sizeOffset);

        Grainy.setAttr(rockElement, Grainy.rock[randAsset]);
    }
}

function grainyPalms(grainyContainer, type, coordinates, Grainy) {
    if(type !== "coast")
        return;

    if((Math.floor(Math.random() * (5 - 0 + 1)) + 0) !== 5)
        return;

    const countPalms = Math.floor(Math.random() * (2 - 1 + 1)) + 0;

    for(var count = 0; count < countPalms; count++) {
        const randAsset = Math.floor(Math.random() * (6 - 1 + 1) + 1);

        const rockElement = d3.select(grainyContainer)
            .append("svg:image")
            .attr("x", coordinates.x)
            .attr("y", coordinates.y)
            .attr("height", 24)
            .attr("width", 24);

        Grainy.setAttr(rockElement, Grainy.tree.palm[randAsset]);
    }
}

function grainyShipWood(grainyContainer, type, coordinates, Grainy) {
    if(type !== "sea")
        return;

    if((Math.floor(Math.random() * (500 - 0 + 1)) + 0) !== 1)
        return;

    const randAsset = Math.floor(Math.random() * (4 - 1 + 1) + 1);
    const xOffset = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
    const yOffset = Math.floor(Math.random() * (5 - 1 + 1)) + 1;

    const shipWoodElement = d3.select(grainyContainer)
        .append("svg:image")
        .attr("x", coordinates.x-(width/2)+xOffset)
        .attr("y", coordinates.y-(height/2)+yOffset)
        .attr("height", 15)
        .attr("width", 15);

    Grainy.setAttr(shipWoodElement, Grainy.ship_wood[randAsset]);
}

function grainyBamboos(grainyContainer, type, coordinates, Grainy) {
    if(type !== "coast")
        return;

    if((Math.floor(Math.random() * (5 - 0 + 1)) + 0) !== 5)
        return;

    const countPalms = Math.floor(Math.random() * (2 - 1 + 1)) + 0;

    for(var count = 0; count < countPalms; count++) {
        const randAsset = Math.floor(Math.random() * (6 - 1 + 1) + 1);

        const rockElement = d3.select(grainyContainer)
            .append("svg:image")
            .attr("x", coordinates.x)
            .attr("y", coordinates.y)
            .attr("height", 24)
            .attr("width", 24);

        Grainy.setAttr(rockElement, Grainy.tree.bamboo[randAsset]);
    }
}

export default function renderGrainy(grainyContainer, cell, coordinates, Grainy) {
    grainyPines(grainyContainer, cell.type, coordinates, Grainy);
    grainyRocks(grainyContainer, cell.type, coordinates, Grainy);
    grainyPalms(grainyContainer, cell.type, coordinates, Grainy);
    grainyBamboos(grainyContainer, cell.type, coordinates, Grainy);
    grainyShipWood(grainyContainer, cell.type, coordinates, Grainy);
}