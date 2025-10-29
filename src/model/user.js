import pool from "@/database/db";

export async function createUser(user_name,full_name,major){
    const [result] = await pool.query(`
    INSERT INTO users (name,real_name,major) values
    (?,?,?)
    `,[user_name,full_name,major])
    if(result){
        return true;
    }
    return false;
}

export async function getUserByUserName(username){
    const [users] = await pool.query(`
    select * from users where name=?
    `,[username]);
    return users[0];
}

export async function getUserById(id){
    const [users] = await pool.query(`
    select * from users where id=?
    `,[id]);
    return users[0];
}

