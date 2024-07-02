const fs = require('fs');
const path = require('path');
const logger = require('../logger');

// Function to initialize or get the current date string
function getCurrentDateString() {
    return new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
}

const rootDirectoryPath = process.cwd(); // Gets the current working directory
// Path to the JSON file where we'll store the request counts
const dataFilePath = path.join(rootDirectoryPath, 'data', 'requestCounts.json');

async function countRequests(req, res, next) {
    if (process.env.NODE_ENV !== 'test') {
        let data;
        try{
            data = await fs.promises.readFile(dataFilePath, 'utf8');
        }
        catch (err) {
            if (err.code === 'ENOENT') {
                // If the file doesn't exist, initialize it with an object containing today's date as key and value 1
                data = await fs.promises.writeFile(dataFilePath, JSON.stringify({ [getCurrentDateString()]: 1 }), () => {
                    logger.info("Initialized request count file.");
                });
            }
            else{
                logger.error({
                    code: 'FILE_READ_FAILED',
                    message: `Failed to retrieve request count data}`,
                    error: err
                });
                throw err;
            }
        }
        // If the file exists, parse the JSON content
        const parsedData = JSON.parse(data);
        const currentDateKey = getCurrentDateString();

        // Check if there's already an entry for today
        if (parsedData[currentDateKey]) {
            // Increment the count for today
            parsedData[currentDateKey] += 1;
        } else {
            // Initialize today's count
            parsedData[currentDateKey] = 1;
        }

        // Update the total request count
        // Calculate TotalRequestCount without including itself
        const filteredValues = Object.entries(parsedData)
            .filter(([key]) => key!== 'TotalRequestCount')
            .map(([_, value]) => parseInt(value, 10));

        parsedData.TotalRequestCount = filteredValues.reduce((acc, val) => acc + val, 0);

        // Write the updated data back to the file
        data = await fs.promises.writeFile(dataFilePath, JSON.stringify(parsedData), () => {
            logger.info("Updated request count file.");
        });
    next();
    }
    else{
        next();
    }
        
}

module.exports = countRequests;