const    connection_sql= require('../database/sql_connection')

const checkQuery = (enroll)=>{
    return `SELECT * FROM students WHERE enroll='${enroll}'`
}

const registerQuery =(enroll,name,roll,branch,section,email,password,salt_college,hashed_password_college)=>{
    return `INSERT INTO students (enroll,name,roll,branch,section,email,password,salt,hash) VALUES ('${enroll}', '${name}', '${roll}','${branch}','${section}','${email}','${password}','${salt_college}','${hashed_password_college}')`
};

const fetchQuery = (email)=>{
    return `SELECT * FROM students WHERE email='${email}'`
}

module.exports={
    checkQuery,
    registerQuery,
    fetchQuery
}