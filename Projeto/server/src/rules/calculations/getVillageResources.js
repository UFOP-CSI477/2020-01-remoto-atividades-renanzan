const Buildings = require("../constants/buildings");

const { differenceInSeconds } = require("date-fns");

function getAmount(resource, farm, werehouse) {
    const { last_value:lastValue, last_spent } = resource;
    const { production } = farm;
    const lastSpent = new Date(last_spent);

    const secounds = differenceInSeconds(new Date(), lastSpent);
    const perSecounds = production / 3600;
    const resourceValue = lastValue + Number((secounds * perSecounds));

    if(resourceValue > werehouse)
        return { value: werehouse, perSecounds };

    return { value: resourceValue, perSecounds };
}

module.exports = (resources, buildings) => {
    const { TimberCamp, ClayPit, IronMine, Warehouse } = buildings;
    const warehouseCapacity = Buildings.Warehouse.getDetails(Warehouse.level).capacity;

    const wood = getAmount(resources.wood, Buildings.TimberCamp.getDetails(TimberCamp.level), warehouseCapacity);
    const clay = getAmount(resources.clay, Buildings.ClayPit.getDetails(ClayPit.level), warehouseCapacity);
    const iron = getAmount(resources.iron, Buildings.IronMine.getDetails(IronMine.level), warehouseCapacity);

    return {
        wood,
        clay,
        iron,
        werehouse: warehouseCapacity,
        time: new Date()
    };
};