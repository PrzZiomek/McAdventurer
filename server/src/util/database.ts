import mysql from 'mysql2';

 const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "adventurer",
    password: "databaze"
});

export const db = pool.promise();