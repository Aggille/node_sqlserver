const sql = require("mssql");
require("dotenv").config();

let connection = null;

const configDB = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
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
    console.log("Connected to SQL Server");
  } catch (err) {
    console.error("Error connecting to SQL Server:", err);
  }
}

async function execSqlQuery(sqlQuery) {
  await getConnection();
  if (connection) {
    try {
      const request = new sql.Request(connection);
      let result = await connection.request().query(sqlQuery);
      await closeConnection();
      console.log("Query executed successfully");
      return { result: result.recordset };
    } catch (error) {
      console.error("Error executing SQL query:", error.message);
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
      console.log("Connection closed");
    } catch (err) {
      console.error("Error closing connection:", err);
    }
  }
}

module.exports = { execSqlQuery };
