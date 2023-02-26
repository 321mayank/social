const    connection_sql= require('../database/sql_connection')

const checkQuery = (enroll)=>{
    return `SELECT * FROM students WHERE enroll='${enroll}'`
}

const registerQuery =(enroll,name,roll,branch,section,email,password)=>{
    return `INSERT INTO students (enroll,name,roll,branch,section,email,password) VALUES ('${enroll}', '${name}', '${roll}','${branch}','${section}','${email}','${password}')`
};

module.exports={
    checkQuery,
    registerQuery,
}