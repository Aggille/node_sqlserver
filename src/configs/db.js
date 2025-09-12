require("dotenv").config();
const logger = require("../logger");
logger.info("Conectando a: ", process.env.DB_DATABASE);
module.exports = {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_SERVER,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  instanceName: process.env.DB_INSTANCE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,

  authentication: {
    type: "default",
    options: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    },
  },
  dialectOptions: {
    options: {
      encrypt: false,
      trustServerCertificate: true,
      trustedConnection: true,
      enableArithAbort: true,
      instanceName: process.env.DB_INSTANCE,
    },
  },
  define: {
    underscored: true,
    underscoredAll: true,
    timestamps: true,
    freezeTableName: true,
  },
};
