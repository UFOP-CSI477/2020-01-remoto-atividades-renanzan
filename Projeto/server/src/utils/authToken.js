const jwt = require("jsonwebtoken");

function generateToken(params, expiresIn) {
    if(expiresIn)
        return jwt.sign({ ...params }, process.env.JWT_TOKEN, { expiresIn });
    return jwt.sign({ ...params }, process.env.JWT_TOKEN, {});
}

const decryptToken = (token) => new Promise(async (resolve, reject) => {
    await jwt.verify(token, process.env.JWT_TOKEN, async (err, decoded) => {
        if(err) {
            if(err.name === "TokenExpiredError")
                return reject({ status: 403, message: "Expired token" });
            
            return reject({ status: 401, message: "Invalid token" });
        }
            
        return resolve({ id: decoded.id });
    });
});

module.exports = {
    generateToken,
    decryptToken
}