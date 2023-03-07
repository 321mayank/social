const { connection_sql } = require('/Node.js/social/database/sql_connection')
const { checkQuery, registerQuery, fetchQuery } = require('../com_query')
const { hashPassword } = require('/Node.js/social/password_hash')
const bcrypt = require('bcrypt')
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

router_company.post('/company-register', async(req,res)=>{
    const {gst,company_name,ceo,email,address,password} = req.body
    const salt_college = await bcrypt.genSalt();
    const hashed_password_college = await hashPassword(password,salt_college);
    connection_sql.query(checkQuery(gst),(err,sql_value)=>{ // checking if email allready exist 
        if (err) {
          console.log(err);
          res.status(500).send();
        } else if (sql_value.length>0) {
          res.send("email already exists");
        } else {
          const insertQuery = registerQuery(gst,company_name,ceo,email,address,password,salt_college,hashed_password_college); 
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

router_company.get('/company-login',(req,res)=>{
  res.render('company_login');
})

router_company.post('/company-login',(req,res)=>{
  const {email, password } =req.body
  connection_sql.query(fetchQuery(email), async  (err,result)=>{
        
    if (err) {
      console.log(err);
      res.status(500).send()
    } else {
    
      if (result.length > 0) {
        const { hash , salt } = result[0];  

        const inputHash = await hashPassword(password, salt);
       
        if (inputHash === hash) {
         
          res.send("login success")
          
        } else {
          res.send('Email or password is incorrect');
        }
      } else {
        res.send('Email or password is incorrect');
      }

    }
  })

}
)




module.exports=router_company;