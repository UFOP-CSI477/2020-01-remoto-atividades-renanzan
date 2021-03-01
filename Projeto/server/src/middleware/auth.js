const UserModel = require("../database/models/User");
const { decryptToken } = require("../utils/authToken");

/**
 * @throws {401} - No credentials sent
 * @throws {401} - Expired token
 * @throws {401} - Invalid token
 * @description Middleware auth token
 */
module.exports = async function(req, res, next) {
    if(!req.headers.authorization)
        return res.status(401).json({ message: 'No credentials sent' });

    try {
        const { id } = await decryptToken(req.headers.authorization);
        const user = await UserModel.findById(id);

        if(!user)
            return res.status(401).json({ message: "Invalid token" });

        req.user = user;

        next();
    } catch({ status, message }) {
        res.status(status || 401).json({ message: message || "Invalid token" })
    }
}