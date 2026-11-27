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
  return result.insertId;
}

async function insertUserAddress(
  userId,
  fullName,
  phone,
  address_line1,
  city,
  state,
  pincode,
  country,
) {
  const sql = `INSERT INTO addresses (user_id, full_name, phone, address_line1, city, state, pincode, country )
  VALUES(?,?,?,?,?,?,?,?)`;

  const values = [
    userId,
    fullName,
    phone,
    address_line1,
    city,
    state,
    pincode,
    country,
  ];
  const result = await queryDatabase(sql, values);
  return result.insertId;
}

async function upDateUser(name, email, phone, userId) {
  const sql = `UPDATE users SET name=? , email =? , phone=?
  WHERE id=?`;
  const values = [name, email, phone, userId];

  const result = await queryDatabase(sql, values);
  return result.affectedRows;
}

module.exports = {
  getUserByEmail,
  getUserById,
  insertUser,
  insertUserAddress,
  upDateUser,
};
