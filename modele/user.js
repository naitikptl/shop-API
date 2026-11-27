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

async function getUserAddress(userId) {
  try {
    const sql = `SELECT * FROM addresses WHERE user_id=?`;
    const values = [userId];
    const result = await queryDatabase(sql, values);

    return result;
  } catch (error) {
    console.error("backend error", error);
  }
}
async function insertUserAddress(
  userId,
  fullName,
  phone,
  address_line1,
  address_line2,
  city,
  state,
  pincode,
  country,
) {
  console.log("user address come", userId);
  console.log(fullName);
  // const sql = `UPDATE  addresses (user_id, full_name, phone, address_line1, address_line2, city, state, pincode, country )
  // VALUES(?,?,?,?,?,?,?,?,?)`;
  const sql = `UPDATE addresses SET full_name=? , phone=? , address_line1=?,address_line2=? , city =?,state=?, pincode=?,country=?
 WHERE user_id=?`;
  try {
    const values = [
      fullName,
      phone,
      address_line1,
      address_line2,
      city,
      state,
      pincode,
      country,
      userId,
    ];
    const result = await queryDatabase(sql, values);
    return result.affectedRows;
  } catch (error) {
    console.log("internal error ", error);
    throw error;
  }
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
  getUserAddress,
  insertUserAddress,
  upDateUser,
};
