const express = require("express");
const getVillageResources = require("../../rules/calculations/getVillageResources");

const VillageModel = require("../models/Village");
const getBuildingsInfo = require("../../rules/village/getBuildingsInfo");
const Buildings = require("../../rules/constants/buildings");
const ConstructionQueue = require("../../rules/village/ConstructionQueue");

const authMiddleware = require("../../middleware/auth");

const router = express.Router();

router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const village = await VillageModel.findById(id).lean();

        village.buildings = getBuildingsInfo(village.buildings);
        village.resources = getVillageResources(village.resources, village.buildings);

        return res.json({ village });
    } catch(err) {
        res.status(404).json({ message: "Village not found" });
    }
});

router.get("/:id/resources", async (req, res) => {
    const { id } = req.params;

    try {
        const village = await VillageModel.findById(id);

        res.json(getVillageResources(village.resources, village.buildings));
    } catch(err) {
        res.status(404).json({ message: "Village not found" });
    }
});

router.post("/:id/build", async (req, res) => {
    const { id } = req.params;
    const { build } = req.body;

    if(!Buildings[build])
        return res.status(400).json({ message: "Invalid build" });

    try {
        const village = await VillageModel.findById(id);
        const constructionQueue = new ConstructionQueue(village);

        try {
            const updatedVillage = await constructionQueue.push(build);

            return res.json(updatedVillage);
        } catch(err) {
            return res.status(400).json({ message: err });
        }
    } catch(err) {
        res.status(404).json({ message: "Village not found" });
    }
});

router.get("/:id/construction-queue", async (req, res) => {
    const { id } = req.params;

    try {
        const village = await VillageModel.findById(id);
        const queue = new ConstructionQueue(village);

        res.json(queue.getQueue());
    } catch(err) {
        res.status(404).json({ message: "Village not found" });
    }
});

router.post("/:id/reset", async (req, res) => {
    const { id } = req.params;

    try {
        const village = await VillageModel.findById(id);

        village.resources.wood.last_value = 1000;
        village.resources.clay.last_value = 1000;
        village.resources.iron.last_value = 1000;
        village.buildings.Barracks.level = 0;
        village.buildings.TimberCamp.level = 1;
        village.buildings.ClayPit.level = 1;
        village.buildings.IronMine.level = 1;
        village.constructionQueue.queue = [];
        village.constructionQueue.lastUpdate = undefined;

        await village.save();

        res.json(village);
    } catch(err) {
        res.status(404).json({ message: "Village not found" });
    }    
});

router.get("/", authMiddleware, async (req, res) => {
    VillageModel.find({
        'owner.user': req.user.id
    }).exec((err, villages) => {
        if(err)
            res.status(404).json({ message: "Villages not found" });

        res.json(villages);
    });
});

router.get("/world/:id", authMiddleware, async (req, res) => {
    const { id } = req.params;

    VillageModel.find({
        'owner.user': req.user.id,
        'owner.map': id
    }).exec((err, villages) => {
        if(err)
            res.status(404).json({ message: "Villages not found" });

        res.json(villages);
    });
});

module.exports = app => app.use('/village', router);