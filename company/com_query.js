const    connection_sql= require('../database/sql_connection')

const checkQuery = (gst)=>{
    return `SELECT * FROM company WHERE gst='${gst}'`
}

const registerQuery =(gst,company_name,ceo,email,address,password)=>{
    return `INSERT INTO company (gst,company_name,ceo,email,address,password) VALUES ('${gst}', '${company_name}','${ceo}','${email}','${address}','${password}')`
};

module.exports={
    checkQuery,
    registerQuery,
}