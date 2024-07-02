const fs = require('fs');
const path = require('path');
const logger = require('./logger');

const rootDirectoryPath = process.cwd(); // Gets the current working directory
// Path to the JSON file where we'll store the request counts
const dataFilePath = path.join(rootDirectoryPath, 'data', 'requestCounts.json');

async function fetchRequestCount() {
    let data;
    try{
        data = await fs.promises.readFile(dataFilePath, 'utf8');
        return data;
    }
    catch (err) {
            logger.error({
                code: 'FILE_READ_FAILED',
                message: `Failed to retrieve request count data}`,
                error: err
            });
            throw err;
        }
}
module.exports = fetchRequestCount;