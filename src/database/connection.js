const { Sequelize } = require("sequelize");
require("dotenv").config();
const sql = require("mssql");
const logger = require("../logger");
let connection = null;

const configDB = {
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  options: {
    trustServerCertificate: true,
    trustedConnection: true,
    enableArithAbort: true,
    instanceName: process.env.DB_INSTANCE,
  },
};

async function getConnection() {
  try {
    connection = await sql.connect(configDB);
    logger.info("Connected to SQL Server");
  } catch (err) {
    logger.error("Error connecting to SQL Server:", err);
  }
}

async function execSqlQuery(sqlQuery) {
  await getConnection();
  if (connection) {
    try {
      let result = await connection.request().query(sqlQuery);
      await closeConnection();
      //logger.info("Query executed successfully");
      return { result: result.recordset };
    } catch (error) {
      logger.error("Error executing SQL query:", error.message);
      return { error: error.message };
    }
  } else {
    return { error: "No connection to SQL Server" };
  }
}

async function closeConnection() {
  if (connection) {
    try {
      await connection.close();
      logger.info("Connection closed");
    } catch (err) {
      logger.error("Error closing connection:", err);
    }
  }
}

async function sequelizeConnection() {
  const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.PASSWORD,
    {
      host: process.env.DB_SERVER,
      port: process.env.DB_PORT,
      dialect: process.env.DB_DIALECT,
      dialectOptions: {
        options: {
          encrypt: false,
          trustServerCertificate: true,
          trustedConnection: true,
          enableArithAbort: true,
          instanceName: process.env.DB_INSTANCE,
        },
      },
    }
  );

  sequelize
    .authenticate()
    .then(() => {
      logger.info(
        "sequelize",
        "Conexão com o banco de dados estabelecida com sucesso."
      );
    })
    .catch((error) => {
      logger.error("sequelize", "Erro ao conectar ao banco de dados:", error);
    });
}

module.exports = { execSqlQuery };
