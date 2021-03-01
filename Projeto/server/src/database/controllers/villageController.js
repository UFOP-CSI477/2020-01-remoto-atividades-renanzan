const express = require("express");

const VillageModel = require("../models/Village");
const getBuildingsInfo = require("../../rules/village/getBuildingsInfo");

const router = express.Router();

router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const village = await VillageModel.findById(id).lean();

        village.buildings = getBuildingsInfo(village.buildings);

        return res.json({ village });
    } catch(err) {
        res.status(404).json(err);
    }
});

module.exports = app => app.use('/village', router);