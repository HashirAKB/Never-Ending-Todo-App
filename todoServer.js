require('dotenv').config();
const app = require("./components/routeHandler");
const cors = require('cors');

const corsOptions = {
  origin: [process.env.FRONTEND_URL, 'http://localhost:5173/'], // replace with your frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: 'Content-Type,Authorization', // Add other headers your client is sending
};

app.use(cors(corsOptions));
const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

module.exports = app;