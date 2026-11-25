const db = require("../config/db");

// get user by email

async function queryDatabase(sql, params) {
  try {
    const [result] = await db.query(sql, params);
    return result;
  } catch (err) {
    throw err;
  }
}

async function getUserByEmail(email) {
  const sql = "SELECT * FROM users WHERE email=?";
  const params = [email];
  const result = await queryDatabase(sql, params);
  return result[0];
}

async function getUserById(id) {
  const sql = "SELECT * FROM users WHERE id = ?";
  const params = [id];
  const result = await queryDatabase(sql, params);
  return result[0];
}

async function insertUser(name, email, password) {
  const sql = `

    INSERT INTO users (name, email, password)

    VALUES (?, ?, ?)

`;
  const values = [name, email, password];

  const result = await queryDatabase(sql, values);
  return result[0];
}

module.exports = {
  getUserByEmail,
  getUserById,
  insertUser,
};
