export const loadVillage = () => {
    const village = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    village.setAttributeNS('http://www.w3.org/1999/xlink', "xlink:href", "../svg/village.svg");
    return village;
};

export const loadHexagonForest = () => {
    const hexagonForest = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    hexagonForest.setAttributeNS('http://www.w3.org/1999/xlink', "xlink:href", "../svg/hexagon_forest.svg");
    return hexagonForest;
}

export const loadHexagonBush = () => {
    const hexagonBush = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    hexagonBush.setAttributeNS('http://www.w3.org/1999/xlink', "xlink:href", "../svg/hexagon_bush.svg");
    return hexagonBush;
}

export const loadHexagonField = () => {
    const hexagonField = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    hexagonField.setAttributeNS('http://www.w3.org/1999/xlink', "xlink:href", "../svg/hexagon_field.svg");
    return hexagonField;
}

export const loadHexagonCoast = () => {
    const hexagonCoast = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    hexagonCoast.setAttributeNS('http://www.w3.org/1999/xlink', "xlink:href", "../svg/hexagon_coast.svg");
    return hexagonCoast;
}

export const loadHexagonSea = () => {
    const hexagonGrass = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    hexagonGrass.setAttributeNS('http://www.w3.org/1999/xlink', "xlink:href", "../svg/hexagon_sea.svg");
    return hexagonGrass;
}

const loadPine = () => {
    const hexagonGrass = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    hexagonGrass.setAttributeNS('http://www.w3.org/1999/xlink', "xlink:href", "../svg/pine.svg");
    return hexagonGrass;
}

export const grainy = {
    loadPine
}

export default {
    loadVillage,
    loadHexagonForest,
    loadHexagonBush,
    loadHexagonField,
    loadHexagonCoast,
    loadHexagonSea,
    grainy: {
        loadPine
    }
}