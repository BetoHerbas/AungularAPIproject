import { pool } from "../db.js"

export const getUsers = async(req, res) => {

    const result = await pool.query('SELECT * FROM users');
    console.log(result[0]);
    res.send(result[0]);
}