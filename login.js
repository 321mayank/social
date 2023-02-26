const { connection_sql } = require('/Node.js/social/database/sql_connection')
const { checkQuery, registerQuery } = require('../uni_query')
const express= require('express')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



router.get('/college-register',(req,res)=>{
    res.render('college_reg');
})

router.post('/college-register',(req,res)=>{
    const {regno,college_name,university_name,address,type,college_email,admin_name,email, paassword }= req.body
    console.log(college_name)
    const emailQuery = checkQuery(email)
    connection_sql.query(emailQuery,(err,sql_value)=>{ // checking if email allready exist 
        if (err) {
          console.log(err);
          res.status(500).send();
        } else if (sql_value.length>0) {
          res.send("email already exists");
        } else {
          const insertQuery = registerQuery(regno,college_name,university_name,address,type,college_email,admin_name,email, paassword); 
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

});

module.exports= router;