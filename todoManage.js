var fs = require('fs');
const logger = require('./logger');

function updateTodoFile(item){
    fs.writeFile("todos.json",JSON.stringify(item), function(err, result){
        if(err) logger.error('error', err);
    });
}

function getDataFromFile(){
    return new Promise((resolve, reject) => {
        if(fs.existsSync('todos.json')){
            const data = fs.readFile('todos.json',(err, data) => {
                if(err){
                    logger.error('error', err);
                    reject(err);
                }
                else{
                    logger.info("This is from getData: " +JSON.parse(data));
                    resolve(JSON.parse(data));
                }
            });
        }
        else{
            const data = [];
            fs.writeFile("todos.json",JSON.stringify(data),function(err, result) {
                if(err){
                    reject('error', err);
                }
                else{
                    resolve(data);
                }
                });
        }
    });
}

module.exports = {
    updateTodoFile,
    getDataFromFile
};