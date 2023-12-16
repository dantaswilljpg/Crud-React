import mysql from "mysql"

export const db = mysql.createConnection({
    host: "localhost",
    user: "aluno",
    password: "aluno",
    database: "crud"
})