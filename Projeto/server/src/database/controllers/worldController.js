const express = require("express");

const router = express.Router();

const { WorldModel, VillageModel } = require("../models");
const { generateWorld, getDayPhase, getMoonPhase, getAvailablePositionsMap } = require("../../rules/world");
const authMiddleware = require("../../middleware/auth");

router.get("/", (req, res) => {
    return WorldModel.find({}).select(["-grid"]).then((cust) => {
        res.status(200).json(cust);
    }).catch(err => {
        res.status(400).json(err);
    })
});

router.get("/get/:id", (req, res) => {
    const _id = req.params.id;

    try {
        WorldModel.findOne({ _id }, (err, cust) => {
            if(err)
                return res.status(404).json({ message: "World not found" });

            const { info, grid } = cust;

            res.json({
                info,
                grid,
                now: {
                    timePhase: getDayPhase(),
                    moonPhase: getMoonPhase()
                }
            });
        });
    } catch(err) {
        res.status(400).json({ message: "Invalid id" });
    }
});

router.get("/generate", (req, res) => {
    const { size, gradient, perlin } = req.query;
    
    const newWorld = generateWorld(size, gradient, perlin);

    res.json(newWorld);
});

router.post("/store", (req, res) => {
    const { info, grid } = req.body;

    // Reset auto increment
    // WorldModel.counterReset('info.world', function(err) {});

    const map = new WorldModel({
        info,
        grid
    });

    map.save((err, cust) => {
        if(err)
            return res.status(400).json(err);

        res.status(201).json(cust);
    });
});

router.post("/join/:mapId", authMiddleware, async (req, res) => {
    const { mapId } = req.params;

    try {
        const map = await WorldModel.findById(mapId);
        var village;

        const availablePositions = getAvailablePositionsMap(map.grid);
        const villagePosition = availablePositions[Math.floor(Math.random() * availablePositions.length)];

        //## Cria uma vila
        try {
            village = new VillageModel({
                owner: { map: mapId, user: req.user.id },
                location: { x: villagePosition.x, y: villagePosition.y, z: villagePosition.z, type: villagePosition.type }
            });

            await village.save();
        } catch(err) {
            console.log("\n\n\n");
            console.log(err);
            console.log("\n\n\n");
            
            return res.status(400).json({ message: "Error creating a village" });
        }

        //## Adicionar informações no mapa
        try {
            villagePosition.village = String(village._id);

            map.save().then((map) => {
                return res.json({
                    village,
                    map
                });
            });
        } catch(err) {
            //## Remover vila que foi criada
            try {
                await village.remove();
            } catch(err) {
                console.log("It was not possible to remove the village that was created: " + err);
            }

            return res.status(400).json({ message: "Error saving map changes" });
        }
    } catch(err) {
        return res.status(400).json({ message: "Request Failed" });
    }
});

module.exports = app => app.use('/world', router);