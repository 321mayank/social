const { connection_sql } = require('/Node.js/social/database/sql_connection')
const { checkQuery, registerQuery, userUpdate, fetchQuery  } = require('../uni_query')
const {  college_reg } = require('/Node.js/social/college/college_validation')
const { hashPassword } = require('/Node.js/social/password_hash')
const bcrypt = require('bcrypt')
const express= require('express')
const path = require('path')
const app = express()
const router_college = express.Router()
const bodyParser = require('body-parser')
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



router_college.get('/college-register',(req,res)=>{
    res.render('college_reg');
})

router_college.post('/college-register',async (req,res)=>{

  const data = college_reg.body.validate(req.body)
    const {regno,college_name,university_name,address,type,college_email,admin_name,email, password }= req.body
    const salt_college = await bcrypt.genSalt();
    const hashed_password_college = await hashPassword(password,salt_college); // used hashPassword to bcrypt password 
        
        console.log(salt_college)
        console.log(hashed_password_college)  
    connection_sql.query(checkQuery(email),(err,sql_value)=>{ // checking if email allready exist 
        if (err) {
          console.log(err);
          res.status(500).send();
        } else if (sql_value.length>0) {
          res.send("email already exists");
        } else {
          const insertQuery = registerQuery(regno,college_name,university_name,address,type,college_email,admin_name,email,password,salt_college,hashed_password_college); 
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
      const user_type = 'admin'
      connection_sql.query(userUpdate(regno,admin_name,email,user_type,salt_college,hashed_password_college),(err,result)=>{
        console.log('ok')
      }
      )

    

});


router_college.get('/college-login',(req,res)=>{
  res.render('college_login');
})

router_college.post('/college-login',(req,res)=>{
  const {email,password} = req.body
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
          // res.render('session')
          // req.session.user = result[0];
          
        } else {
          res.send('Email or password is incorrect');
        }
      } else {
        res.send('Email or password is incorrect');
      }

    }
  })

  

})

module.exports= router_college;