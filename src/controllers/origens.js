const { execSqlQuery } = require("../db/connection");

async function getOrigens(req, res) {
  const results = await execSqlQuery("SELECT * FROM ORIGENS");
  if (results.result.length === 0) {
    return res.status(404).json({ error: "Nenhuma origem encontrada" });
  } else {
    res.status(200).json(results);
  }
}

async function getOrigemById(req, res) {
  const { id } = req.params;
  const results = await execSqlQuery(`SELECT * FROM ORIGENS WHERE ID = ${id}`);

  if (results.result.length === 0) {
    return res.status(404).json({ error: "Origem não encontrada" });
  }

  res.status(200).json(results.result[0]);
}

module.exports = { getOrigens, getOrigemById };
