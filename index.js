const express = require("express");

const db = require("./config/db");

const app = express();

const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`server start on ${port}`);
});
