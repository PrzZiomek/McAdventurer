import mysql from 'mysql2';

 const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "venturer_database",
    password: "venturer"
});

export const db = pool.promise();