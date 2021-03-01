const jwt = require("jsonwebtoken");

/**
 * @param {Object} params - Object that will be encoded without token
 * @param {Number} expiresIn - Time in seconds to expire the authentication token, leave empty to not expire
 * @returns {String} Auth token jwt
 * @description Use to generate a jwt authentication token
 */
function generateToken(params, expiresIn) {
    if(expiresIn)
        return jwt.sign({ ...params }, process.env.JWT_TOKEN, { expiresIn });
    return jwt.sign({ ...params }, process.env.JWT_TOKEN, {});
}

/**
 * @param {String} token - Jwt token
 * @throws {403} Expired token
 * @throws {401} Invalid token
 * @returns {Promise} Promise object represents the decoded id of jwt auth token
 * @description Use to decode the jwt authentication token
 */
const decryptToken = (token) => new Promise(async (resolve, reject) => {
    await jwt.verify(token, process.env.JWT_TOKEN, async (err, decoded) => {
        if(err) {
            if(err.name === "TokenExpiredError")
                return reject({ status: 401, message: "Expired token" });
            
            return reject({ status: 401, message: "Invalid token" });
        }
            
        return resolve({ id: decoded.id });
    });
});

module.exports = {
    generateToken,
    decryptToken
}