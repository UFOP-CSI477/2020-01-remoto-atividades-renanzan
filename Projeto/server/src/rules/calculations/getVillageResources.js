const Buildings = require("../constants/buildings");

const { differenceInSeconds } = require("date-fns");

function getAmount(resource, farm, werehouse) {
    const { production_per_hour:perHour } = farm;
    const { last_value:lastValue, last_spent } = resource;
    const lastSpent = new Date(last_spent);

    const secounds = differenceInSeconds(new Date(), lastSpent);
    const perSecounds = perHour / 3600;
    const resourceValue = lastValue + Number((secounds * perSecounds));

    if(resourceValue > werehouse)
        return { value: werehouse, perSecounds };

    return { value: resourceValue, perSecounds };
}

function calcVillageResources (resources, buildings) {
    const { timber_camp, iron_mine, clay_pit, warehouse } = buildings;
    const werehouseCapacity = Buildings.warehouse.get(warehouse.level).warehouse_capacity;

    const wood = getAmount(resources.wood, Buildings.timber_camp.get(timber_camp.level), werehouseCapacity);
    const clay = getAmount(resources.clay, Buildings.clay_pit.get(clay_pit.level), werehouseCapacity);
    const iron = getAmount(resources.iron, Buildings.iron_mine.get(iron_mine.level), werehouseCapacity);

    return {
        wood,
        clay,
        iron,
        werehouse: werehouseCapacity,
        time: new Date()
    };
}

module.exports = calcVillageResources;