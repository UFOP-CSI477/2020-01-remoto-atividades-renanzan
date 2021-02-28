const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const { decryptToken, generateToken } = require("../../utils/authToken");

const router = express.Router();

router.post('/register', async (req, res) => {
    const { email, username } = req.body;

    try {
        if(await User.findOne({ email }))
            return res.status(400).json({ error: "Email already exists." });

        if(await User.findOne({ username }))
            return res.status(400).json({ error: "Username already exists." });

        const user = await User.create(req.body);

        user.password = undefined;

        return res.status(201).json({
            user,
            token: generateToken({ id: user.id }, 86400)
        });
    } catch(err) {
        return res.status(400).send(err);
    }
});

router.post('/authenticate', async (req, res) => {
    const { username, password, persist } = req.body;

    const user = await User.findOne({ username }).select('+password');

    if(!user)
        return res.status(404).json({ message: "Invalid combination" });

    if(!await bcrypt.compare(password, user.password))
        return res.status(400).json({ message: "Invalid combination" });

    user.password = undefined;

    var token;

    if(persist)
        token = generateToken({ id: user.id });

    return res.json({
        user,
        token: generateToken({ id: user.id }, 86400)
    });
});

router.post('/validate', async (req, res) => {
    const { token } = req.body;

    try {
        const { id } = await decryptToken(token);

        const user = await User.findById(id);

        if(!user)
            return res.status(403).json({ message: "Invalid token" });

        return res.json(user);
    } catch({ status, message }) {
        res.status(status || 403).json({ message: message || "Invalid token" });
    }
});

module.exports = app => app.use('/auth', router);