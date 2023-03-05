const { connection_sql } = require('/Node.js/social/database/sql_connection')
const { checkQuery, registerQuery, userUpdate  } = require('../uni_query')
const {  college_reg } = require('/Node.js/social/college/college_validation')
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

router_college.post('/college-register',(req,res)=>{

  const data = college_reg.body.validate(req.body)
    const {regno,college_name,university_name,address,type,college_email,admin_name,email, password }= req.body
    console.log(college_name)
    connection_sql.query(checkQuery(email),(err,sql_value)=>{ // checking if email allready exist 
        if (err) {
          console.log(err);
          res.status(500).send();
        } else if (sql_value.length>0) {
          res.send("email already exists");
        } else {
          const insertQuery = registerQuery(regno,college_name,university_name,address,type,college_email,admin_name,email,password); 
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
      connection_sql.query(userUpdate(regno,admin_name,email,user_type),(err,result)=>{
        console.log('ok')
      }
      )

    

});



module.exports= router_college;