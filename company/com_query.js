const    connection_sql= require('../database/sql_connection')

const checkQuery = (gst)=>{
    return `SELECT * FROM company WHERE gst='${gst}'`

}

const fetchQuery = (email)=>{
    return `SELECT * FROM company WHERE email='${email}'`
}


const registerQuery =(gst,company_name,ceo,email,address,password,salt_college,hashed_password_college)=>{
    return `INSERT INTO company (gst,company_name,ceo,email,address,password,salt,hash) VALUES ('${gst}', '${company_name}','${ceo}','${email}','${address}','${password}','${salt_college}','${hashed_password_college}')`
};


module.exports={
    checkQuery,
    registerQuery,
    fetchQuery
}