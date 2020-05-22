const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "grads-offers-node",
  password: "postgres",
  port: 5432,
});

client.connect();

client.query("SELECT NOW()", (err, res) => {
  //console.log(err, res);
  //client.end();
});

module.exports = client;
