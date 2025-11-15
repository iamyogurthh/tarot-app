import pool from "@/database/db";

export async function getAllCategories() {
    const [categories] = await pool.query(`
    select * from categories
    `)
    return categories;
}

export async function getCategoryById(id) {
    const [category] = await pool.query(`
    select * from categories where id=?
    `, [id])
    return category[0];
}

export async function getCategoryByName(name) {
    const [category] = await pool.query(`
    select * from categories where name=?
    `, [name])
    return category[0];
}


export async function getCategoryIDByCategoryName(name) {
    const [category] = await pool.query(`
    select * from categories where name=?
    `, [name])
    return category[0].id;
}

export async function getCategoryByCategoryId(id) {
    const [category] = await pool.query(`
    select * from categories where id=?
    `, [id])
    return category[0].name;
}

export async function createCategory(name, image = null) {
    const isOk = await pool.query(`
    insert into categories (name,image) values (?,?)
    `, [name, image]);
    if (isOk) {
        return true;
    }
    return false;

}

export async function editCategory(id, name, image = null) {
    const [result] = await pool.query(
        `UPDATE categories 
         SET name = ?,image = ? 
         WHERE id = ? `,
        [name, image, id]
    );

    return result.affectedRows > 0;
}

export async function deleteCategory(id) {
    const [result] = await pool.query(
        `DELETE FROM categories WHERE id = ?`,
        [id]
    );
    return result.affectedRows > 0;
}
