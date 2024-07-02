const app = require("./components/routeHandlers");
const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

module.exports = app;