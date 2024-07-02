var fs = require('fs');
const logger = require('./logger');
const dbFileName = './data/todos.json';

function updateTodoFile(item = []){
    return new Promise((resolve, reject) => {
        fs.writeFile(dbFileName,JSON.stringify(item),function(err, data) {
            if(err){
                reject({
                    code: 'FILE_WRITE_ERROR',
                    message: `Error writing to file: ${dbFileName}`,
                    error: err
                });
            }
            else{
                if( item.length === 0 ){
                    logger.info("No existing records, Created an empty list.");
                }
                resolve(item);
            }
        });
    })
}

function getDataFromFile() {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(dbFileName)) {
            const shouldFail = Math.random() < 0.5; //Simulating transient error by randomly failing.
            if (false) {
                reject({
                    code: 'TRANSIENT_ERROR',
                    message: `Simulated transient error while reading file: ${dbFileName}`,
                    error: `shouldFail is ${shouldFail}`
                });
            } else {
                fs.readFile(dbFileName, (err, data) => {
                    if (err) {
                        reject({
                            code: 'FILE_READ_ERROR',
                            message: `Error reading file: ${dbFileName}`,
                            stack: err.stack, // Include stack trace
                            error: err
                        });
                    } else {
                        try {
                            logger.info("This is the OG Data: " + data);
                            logger.info("This is from getData: " + JSON.parse(data));
                            resolve(JSON.parse(data));
                        } catch (anyErrorWhileParsing) {
                            reject({
                                code: 'JSON_PARSE_ERROR',
                                message: `Error parsing JSON data from file: ${dbFileName}`,
                                stack: anyErrorWhileParsing.stack, // Include stack trace
                                error: anyErrorWhileParsing
                            });
                        }
                    }
                });
            }
        } else {
            updateTodoFile().then(resolve).catch(reject); // Chain the promises
        }
    });
}

module.exports = {
    updateTodoFile,
    getDataFromFile
};