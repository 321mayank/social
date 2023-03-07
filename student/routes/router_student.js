const { connection_sql } = require('/Node.js/social/database/sql_connection')
const { checkQuery, registerQuery, fetchQuery } = require('../query_student')
const { hashPassword } = require('/Node.js/social/password_hash')
const bcrypt = require('bcrypt')

const express= require('express')
const app = express()
const router_student = express.Router()
const bodyParser = require('body-parser')
const { query } = require('express')
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router_student.get('/student-register',(req,res)=>{
    res.render('student_reg');
})

router_student.post('/student-register',async(req,res)=>{
  
    const {enroll,name,roll,branch,section,email,password} = req.body
    const salt_college = await bcrypt.genSalt();
    const hashed_password_college = await hashPassword(password,salt_college); // used hashPassword to bcrypt password 
    connection_sql.query(checkQuery(enroll),(err,sql_value)=>{ // checking if email allready exist 
        if (err) {
          console.log(err);
          res.status(500).send();
        } else if (sql_value.length>0) {
          res.send("student already exists");
        } else {
          const insertQuery = registerQuery(enroll,name,roll,branch,section,email,password,salt_college,hashed_password_college); 
          connection_sql.query(insertQuery, (err, result) => { // if no error then the insert query will execute and add the user to database
            if (err) {
              console.log(err);
              res.status(500).send();
            } else {
              console.log("User data inserted successfully");
              res.send("successfully Registered ");
            }
          });
        }
      });
})


router_student.get('/student-login',(req,res)=>{
  res.render('student_login');
})
router_student.post('/student-login',(req,res)=>{
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


})
module.exports= router_student;