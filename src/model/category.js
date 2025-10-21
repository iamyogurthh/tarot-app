import pool from "@/database/db";

export async function getCategoryIDByCategoryName(name){
    const [category] = await pool.query(`
    select * from categories where name=?
    `,[name])
    return category[0].id;
}

export async function getCategoryByCategoryId(id){
    const [category] = await pool.query(`
    select * from categories where id=?
    `,[id])
    return category[0].name;
}