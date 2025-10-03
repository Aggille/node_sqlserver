require("./src/database/index.js");
const express = require("express");
const routes = require("./src/routes/routes");
const app = express();
app.use(express.json());
app.use(routes);
const logger = require("./src/logger");
require("moment/locale/pt-br");
const moment = require("moment");

const port = process.env.APP_PORT || 3000;

app.listen(port, () => {
  moment.locale("pt-br");
  logger.info(`Server is running on port ${port}`);
});
