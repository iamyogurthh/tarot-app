import pool from '@/database/db'

export async function getAllUsers() {
  const [users] = await pool.query(
    `
    select * from users
    `)
  return users;
}

export async function createUser(user_name, full_name, dob) {
  const [result] = await pool.query(
    `
    INSERT INTO users (name,real_name,dob) values
    (?,?,?)
    `,
    [user_name, full_name, dob]
  )
  if (result) {
    return true
  }
  return false
}

export async function getUserByUserName(username) {
  const [users] = await pool.query(
    `
    select * from users where name=?
    `,
    [username]
  )
  return users[0]
}

export async function getUserById(id) {
  const [users] = await pool.query(
    `
    select * from users where id=?
    `,
    [id]
  )
  return users[0]
}

export async function deleteUserById(id) {
  const [result] = await pool.query(
      `DELETE FROM users WHERE id = ?`,
      [id]
  );
  return result.affectedRows > 0;
}
