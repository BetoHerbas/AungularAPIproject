import { createPool } from "mysql2/promise";
export const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'saulito',
    port: '3306',
    database: 'storedb',
})