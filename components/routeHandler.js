// routeHandlers.js
const express = require('express');
const logger = require('./logger.js');
const cors = require('cors');

const countRequests = require('./middlewares/requestCounter.js');
const {requestLimiter} = require('./middlewares/rateLimitter.js')

const userRouter = require('../routes/userRoute.js');
const todoRouter = require('../routes/todoRoutes.js');
const reqCountRouter = require('../routes/requestCountRoute.js');

const app = express();
app.use(countRequests);
app.use(requestLimiter);
app.use(express.json());

const corsOptions = {
    origin: [process.env.FRONTEND_URL, 'http://localhost:5173'], // replace with your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: 'Content-Type,Authorization', // Add other headers your client is sending
  };

app.use(cors(corsOptions));
app.use('/todos', todoRouter);
app.use('/user', userRouter);
app.use('/requestcount', reqCountRouter);

app.use((err, req, res, next) => {
    if(err){
        res.setHeader('X-Error-Message', err.message);
        res.status(404).json({ error: err.message});
    }
});

module.exports = app;
