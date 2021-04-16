export const ASSETS = {
    pieces: {
        forest: '../svg/hexagon_forest.svg',
        bush: '../svg/hexagon_bush.svg',
        field: '../svg/hexagon_field.svg',
        coast: '../svg/hexagon_coast.svg',
        sea: '../svg/hexagon_sea.svg',
    },
    grainy: {
        village: (num) => `../svg/grainy/villages/village_${num}.svg`,
        pines: (num) => `../svg/grainy/trees/pines/pine_${num}.png`,
        palms: (num) => `../svg/grainy/trees/palms/palm_${num}.png`,
        bamboos: (num) => `../svg/grainy/trees/bamboos/bamboo_${num}.png`,
        rocks: (num) => `../svg/grainy/rocks/rock_${num}.png`,
        ship_wood: (num) => `../svg/grainy/ship_wood/ship_wood_${num}.png`
    }
}

function createSvgElement(document, src) {
    const element = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    
    element.setAttributeNS('http://www.w3.org/1999/xlink', "xlink:href", src);
    
    return element;
}

function setAttr(element, asset) {
    element.attr("xlink:href", asset.getAttributeNS('http://www.w3.org/1999/xlink', "href"));
}

export const loadPieces = (document) => {
    return ({
        forest: createSvgElement(document, ASSETS.pieces.forest),
        bush: createSvgElement(document, ASSETS.pieces.bush),
        field: createSvgElement(document, ASSETS.pieces.field),
        coast: createSvgElement(document, ASSETS.pieces.coast),
        sea: createSvgElement(document, ASSETS.pieces.sea),
        setAttr
    });
}

export const loadGrainy = (document) => {
    return ({
        village: {
            1: createSvgElement(document, ASSETS.grainy.village(1)),
            2: createSvgElement(document, ASSETS.grainy.village(2)),
            3: createSvgElement(document, ASSETS.grainy.village(3)),
            4: createSvgElement(document, ASSETS.grainy.village(4)),
            5: createSvgElement(document, ASSETS.grainy.village(5))
        },
        tree: {
            pine: {
                1: createSvgElement(document, ASSETS.grainy.pines(1)),
                2: createSvgElement(document, ASSETS.grainy.pines(2)),
                3: createSvgElement(document, ASSETS.grainy.pines(3)),
                4: createSvgElement(document, ASSETS.grainy.pines(4)),
                5: createSvgElement(document, ASSETS.grainy.pines(5)),
                6: createSvgElement(document, ASSETS.grainy.pines(6)),
                7: createSvgElement(document, ASSETS.grainy.pines(7)),
                8: createSvgElement(document, ASSETS.grainy.pines(8))
            },
            palm: {
                1: createSvgElement(document, ASSETS.grainy.palms(1)),
                2: createSvgElement(document, ASSETS.grainy.palms(2)),
                3: createSvgElement(document, ASSETS.grainy.palms(3)),
                4: createSvgElement(document, ASSETS.grainy.palms(4)),
                5: createSvgElement(document, ASSETS.grainy.palms(5)),
                6: createSvgElement(document, ASSETS.grainy.palms(6)),
            },
            bamboo: {
                1: createSvgElement(document, ASSETS.grainy.bamboos(1)),
                2: createSvgElement(document, ASSETS.grainy.bamboos(2)),
                3: createSvgElement(document, ASSETS.grainy.bamboos(3)),
                4: createSvgElement(document, ASSETS.grainy.bamboos(4)),
                5: createSvgElement(document, ASSETS.grainy.bamboos(5)),
                6: createSvgElement(document, ASSETS.grainy.bamboos(6)),
            }
        },
        rock: {
            1: createSvgElement(document, ASSETS.grainy.rocks(1)),
            2: createSvgElement(document, ASSETS.grainy.rocks(2)),
            3: createSvgElement(document, ASSETS.grainy.rocks(3)),
            4: createSvgElement(document, ASSETS.grainy.rocks(4)),
            5: createSvgElement(document, ASSETS.grainy.rocks(5))
        },
        ship_wood: {
            1: createSvgElement(document, ASSETS.grainy.ship_wood(1)),
            2: createSvgElement(document, ASSETS.grainy.ship_wood(2)),
            3: createSvgElement(document, ASSETS.grainy.ship_wood(3)),
            4: createSvgElement(document, ASSETS.grainy.ship_wood(4))
        },
        setAttr
    });
}