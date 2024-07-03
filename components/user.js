const fs = require('fs');
const path = require('path');
const logger = require('../components/logger');

const rootDirectoryPath = process.cwd(); // Gets the current working directory
// Path to the JSON file where we'll store the users
const dataFilePath = path.join(rootDirectoryPath, 'data', 'users.json');

async function updateUsers(user = []) {
    return new Promise((resolve, reject) => {
        fs.writeFile(dataFilePath,JSON.stringify(user),function(err, data) {
            if(err){
                reject({
                    code: 'FILE_WRITE_ERROR',
                    message: `Error writing to file: ${dataFilePath}`,
                    error: err
                });
            }
            else{
                if( user.length === 0 ){
                    logger.info("No existing records, Created an empty list.");
                }
                resolve(user);
            }
        });
    });
}

function getUsers() {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(dataFilePath)) {
                fs.readFile(dataFilePath, (err, data) => {
                    if (err) {
                        reject({
                            code: 'FILE_READ_ERROR',
                            message: `Error reading file: ${dataFilePath}`,
                            stack: err.stack, // Include stack trace
                            error: err
                        });
                    } else {
                        try {
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
        } else {
            updateUsers().then(resolve).catch(reject); // Chain the promises
        }
    });
}
module.exports = {getUsers, updateUsers};