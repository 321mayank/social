const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router_college = require('./college/routes/router_uni')
app.set('view engine', 'ejs');
const router_student = require('./student/routes/router_student')
const router_company = require('./company/routers/router_com')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => { //rendered the login page
    res.render('index');
})
app.get('/register',(req,res)=>{
  res.render('register')
})
app.get('/login',(req,res)=>{
  res.render('login')
})
app.use('/',router_college)
app.use('/',router_student)
app.use('/',router_company)
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
