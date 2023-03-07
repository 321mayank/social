const    connection_sql= require('../database/sql_connection')

const checkQuery = (email)=>{
    return `SELECT * FROM college WHERE email='${email}'`
}

const fetchQuery = (email)=>{
    return `SELECT * FROM college_user WHERE email='${email}'`
}

const registerQuery =(regno,college_name,university_name,address,type,college_email,admin_name,email, password,salt_college,hashed_password_college)=>{
    return `INSERT INTO college (regno,college_name,university_name,address,type,college_email,admin_name,email, password,salt,hash) VALUES ('${regno}', '${college_name}', '${university_name}','${address}','${type}','${college_email}','${admin_name}','${email}','${password}','${salt_college}','${hashed_password_college}')`
};

const userUpdate =(regno,admin_name,email,user_type,salt_college,hashed_password_college)=>{
    return`INSERT INTO college_user(regno,name,email,user_type,salt,hash) VALUES('${regno}','${admin_name}','${email}', '${user_type}','${salt_college}','${hashed_password_college}')`
}
module.exports={
    checkQuery,
    registerQuery,
    userUpdate,
    fetchQuery
}