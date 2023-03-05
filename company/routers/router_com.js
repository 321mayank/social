const { connection_sql } = require('/Node.js/social/database/sql_connection')
const { checkQuery, registerQuery  } = require('../com_query')
const express= require('express')
const path = require('path')
const app = express()
const router_company = express.Router()
const bodyParser = require('body-parser')
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router_company.get('/company-register',(req,res)=>{
    res.render('company_reg')
    })

router_company.post('/company-register',(req,res)=>{
    const {gst,company_name,ceo,email,address,password} = req.body
    connection_sql.query(checkQuery(gst),(err,sql_value)=>{ // checking if email allready exist 
        if (err) {
          console.log(err);
          res.status(500).send();
        } else if (sql_value.length>0) {
          res.send("email already exists");
        } else {
          const insertQuery = registerQuery(gst,company_name,ceo,email,address,password); 
          connection_sql.query(insertQuery, (err, result) => { // if no error then the insert query will execute and add the user to database
            if (err) {
              console.log(err);
              res.status(500).send();
            } else {
              console.log("User data inserted successfully");
              res.send("User data inserted successfully");
            }
          });
        }
      });

})


module.exports=router_company;