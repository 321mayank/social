const mysql = require('mysql')

const connect_sql = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'social'
})

module.exports={
    connect_sql
}