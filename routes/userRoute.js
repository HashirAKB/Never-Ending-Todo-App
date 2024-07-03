const { Router } = require("express");
const router = Router();

router.get('/', function(req, res) {
    throw new Error("User not found");
});

module.exports = router
