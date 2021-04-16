const express = require("express");

const Form = require('../models/Form');
const authMiddleware = require("../../middleware/auth");

const router = express.Router();

router.use(authMiddleware);

router.post("/", async (req, res) => {
    try {
        const form = await Form.create({
            user: req.user.id,
            sintomas: req.body
        });

        res.json(form);
    } catch(err) {
        console.log(err);
        res.status(400).json({ error: "Não funcionou" });
    }
});

module.exports = app => app.use('/form', router);