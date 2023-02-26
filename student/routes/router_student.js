const { connection_sql } = require('/Node.js/social/database/sql_connection')
const { checkQuery, registerQuery  } = require('../query_student')
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

router_student.post('/student-register',(req,res)=>{
    const {enroll,name,roll,branch,section,email,password} = req.body
    connection_sql.query(checkQuery(enroll),(err,sql_value)=>{ // checking if email allready exist 
        if (err) {
          console.log(err);
          res.status(500).send();
        } else if (sql_value.length>0) {
          res.send("student already exists");
        } else {
          const insertQuery = registerQuery(enroll,name,roll,branch,section,email,password); 
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

module.exports= router_student;