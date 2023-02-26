const    connection_sql= require('../database/sql_connection')

const checkQuery = (email)=>{
    return `SELECT * FROM college WHERE email='${email}'`
}

const registerQuery =(regno,college_name,university_name,address,type,college_email,admin_name,email, password)=>{
    return `INSERT INTO college (regno,college_name,university_name,address,type,college_email,admin_name,email, password) VALUES ('${regno}', '${college_name}', '${university_name}','${address}','${type}','${college_email}','${admin_name}','${email}','${password}')`
};

const userUpdate =(regno,admin_name,email,user_type)=>{
    return`INSERT INTO college_user(regno,name,email,user_type) VALUES('${regno}','${admin_name}','${email}', '${user_type}')`
}
module.exports={
    checkQuery,
    registerQuery,
    userUpdate
}