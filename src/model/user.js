import pool from "@/database/db";

export async function createUser(user_name,full_name,dob,major,zodiac,numerology){
    const [result] = await pool.query(`
    INSERT INTO users (name,real_name,dob,major,zodiac,numerology) values
    (?,?,?,?,?,?)
    `,[user_name,full_name,dob,major,zodiac,numerology])
    if(result){
        return true;
    }
    return false;
}


export async function getUserByUserNameAndRealName(username,realName){
    const [user] = await pool.query(`
    select * from users where name=? and real_name=?
    `,[username,realName]);
    console.log("Inside the getUserByUserName ",user);
    return user[0];
}

export async function getFirstUserByUserName(username){
    const [users] = await pool.query(`
    select * from users where name=? order by id asc
    `,[username]);
    return users[0];
}

export async function getUserById(id){
    const [users] = await pool.query(`
    select * from users where id=?
    `,[id]);
    return users[0];
}

