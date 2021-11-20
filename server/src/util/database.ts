import mysql from 'mysql2';

 const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "adventurer_database",
    password: "databaze"
});

export const db = pool.promise();