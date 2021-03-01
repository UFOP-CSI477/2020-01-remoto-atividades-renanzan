const Buildings = require("../constants/buildings");

module.exports = (buildings) => {
    const { Headquarters, Barracks, Farm, Warehouse, TimberCamp, IronMine, ClayPit } = buildings;

    var population = 0;
    const hq = Headquarters.level;

    const info = {
        Headquarters: Buildings.Headquarters.getDetails(Headquarters.level, hq),
        Barracks: Buildings.Barracks.getDetails(Barracks.level, hq),
        Farm: Buildings.Farm.getDetails(Farm.level, hq),
        Warehouse: Buildings.Warehouse.getDetails(Warehouse.level, hq),
        TimberCamp: Buildings.TimberCamp.getDetails(TimberCamp.level, hq),
        IronMine: Buildings.IronMine.getDetails(IronMine.level, hq),
        ClayPit: Buildings.ClayPit.getDetails(ClayPit.level, hq)
    };
    
    for(const key of Object.keys(info))
        population += (info[key].population || 0);

    info.maximumPopulation = info.Farm.maximumPopulation;
    info.population = population;

    return info;
}