const { Router } = require("express");
const router = Router();
const fetchRequestCount = require('../components/fetchRequestCount.js');
const logger = require('../components/logger');

router.get('/', async (req,res) => {
    try{
        const countData = await fetchRequestCount();
        res.status(200).json(countData);
        logger.info("Returned request count info");
    } catch (error) {
        logger.error({
            code: 'REQUEST_COUNT_FETCH_FAILED',
            message: `Failed to retrieve request count`,
            error: error
        });
        res.status(500).json({ error: "Failed to retrieve request count"});
    }

});


module.exports = router