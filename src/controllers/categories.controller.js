import { pool } from "../db.js"

export const getCategories = async(req, res) => {

    const result = await pool.query('SELECT * FROM categories');
    console.log(result[0]);
    res.send(result[0]);
};