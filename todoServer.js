require('dotenv').config();
const app = require("./components/routeHandler");
const cors = require('cors');
app.use(cors);
const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

module.exports = app;