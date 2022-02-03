const jwt = require("jsonwebtoken");
const secretKey = "pakipakapepekhay";

const fetchUser = (req, res, next) => {
    //get the user from the jwt token and add idd to req object
    const token = req.header("auth-token");

    if (!token) {
        res.status(401).send({ error: "Invalid token" });
    }
    try {
        const data = jwt.verify(token, secretKey);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Invalid token" });
    }
};
module.exports = fetchUser;
