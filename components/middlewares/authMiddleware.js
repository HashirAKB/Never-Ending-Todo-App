var { expressjwt: jwt } = require("express-jwt");
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = jwt({
    secret: JWT_SECRET,
    algorithms: ['HS256']
});

module.exports = authMiddleware;