const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWTSECRET


const varifyToken = (req, res, next) =>{
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if(!token){
        return res.status(403).send("Token is required for Authorization");
    }

    try {
        const decoded = jwt.verify(token, jwtSecret)
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Token is invalid.");
    }

    return next();
}

module.exports = varifyToken;