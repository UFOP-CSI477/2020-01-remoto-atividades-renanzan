const express = require("express");

const router = express.Router();

const { WorldModel, VillageModel } = require("../models");
const { generateWorld, getDayPhase, getMoonPhase, getAvailablePositionsMap } = require("../../rules/world");
const authMiddleware = require("../../middleware/auth");

router.get("/", authMiddleware, (req, res) => {
    WorldModel
        .find({})
        .select(["-grid"])
        .lean()
        .then((worlds) => {
            VillageModel
                .find({'owner.user': req.user.id})
                .distinct("owner.map")
                .then(playing => {
                    playing.forEach(playingWorld => {
                        const world = worlds.filter(world => String(world._id) === String(playingWorld))[0];
                        
                        if(world)
                            world.info.playing = true;
                    });

                    worlds.sort((a, b) => {
                        if(Boolean(a.info.playing) && !Boolean(b.info.playing))
                            return -1;

                        return String(a).localeCompare(b);
                    });

                    res.status(200).json(worlds);
                })
                .catch(err => {
                    res.status(404).json({ message: "Villages not found" });
                });
    }).catch(err => {
        res.status(400).json(err);
    })
});

router.get("/get/:id", authMiddleware, (req, res) => {
    const _id = req.params.id;

    try {
        WorldModel.findOne({ _id }, async (err, cust) => {
            if(err)
                return res.status(404).json({ message: "World not found" });

            const { info, grid } = cust;

            try {
                const village = await VillageModel.findOne({
                    'owner.user': req.user.id,
                    'owner.map': _id
                }).exec();
        
                if(!village)
                    return res.status(400).json({ message: "This user doesn't have a village in this world" });

                delete info.$init;

                res.json({
                    info: {
                        ...info,
                        center: {
                            x: village.location.x,
                            y: village.location.y,
                            z: village.location.z,
                        },
                        village: village._id
                    },
                    grid,
                    now: {
                        timePhase: getDayPhase(),
                        moonPhase: getMoonPhase()
                    }
                });
            } catch(err) {
                return res.status(400).json({ message: "It was not possible to verify if the user already has a village in this world" });
            }
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

    //## Verifica se o usuário já possui uma vila nesse mundo
    try {
        const villages = await VillageModel.find({
            'owner.user': req.user.id,
            'owner.map': mapId
        }).exec();

        if(villages.length > 0)
            return res.status(403).json({ message: "This user already has a village in this world" });
    } catch(err) {
        return res.status(400).json({ message: "It was not possible to verify if the user already has a village in this world" });
    }

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