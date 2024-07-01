var fs = require('fs');

function updateTodoFile(item){
    fs.writeFile("todos.json",JSON.stringify(item), function(err, result){
        if(err) console.log('error',err);
    });
}

function getDataFromFile(){
    return new Promise((resolve, reject) => {
        if(fs.existsSync('todos.json')){
            const data = fs.readFile('todos.json',(err, data) => {
                if(err){
                    reject(err);
                }
                else{
                    // console.log("This is the OG Data: "+data);
                    // console.log("This is from getData: "+JSON.parse(data));
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