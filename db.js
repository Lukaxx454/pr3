const sql = require('mssql');
require('dotenv').config();

const config = {
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  options: {
    encrypt: false, // se estiver usando local, false; para Azure, true
    enableArithAbort: true,
    trustServerCertificate: true // para conexões locais
  }
};

let pool;

async function getConnection() {
  try {
    if (pool) {
      console.log('Usando conexão existente');
      return pool;
    }
    pool = await sql.connect(config);
    console.log('Conectado ao SQL Server');
    return pool;
  } catch (err) {
    console.error('Erro ao conectar ao banco:', err);
    throw err;
  }
}

module.exports = { getConnection, sql };