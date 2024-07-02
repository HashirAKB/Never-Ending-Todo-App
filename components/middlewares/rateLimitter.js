const logger = require('../logger');

let numberOfRequestsForUser = {};
setInterval(() => {
    numberOfRequestsForUser = {};
}, 1000)

function requestLimiter(req, res, next){
  let user = req.headers['user-id'];
  if(user){
    if(!(user in numberOfRequestsForUser)){
        numberOfRequestsForUser[user] = 0;
        console.log(`Logging user ${user} for the first time.`);
        next();
      }
      else
      {
        let count = numberOfRequestsForUser[user];
        count = count + 1;
        numberOfRequestsForUser[user] = count;
        console.log(`Logging user ${user} for the ${count} time.`);
        if(count >= 3){
          logger.info(`Max attempts reached for user: ${user}.`);
          res.status(404).json({msg: "Maximum limit reached, try after some time."});
        }else{
          next();
        }
      }
  }
  else{
    next();
  }
}
module.exports = requestLimiter;