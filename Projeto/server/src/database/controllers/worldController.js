const express = require("express");

const router = express.Router();

const { WorldModel, VillageModel } = require("../models");
const { generateWorld, getDayPhase, getMoonPhase } = require("../../rules/world");

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

module.exports = app => app.use('/world', router);