const express = require("express");
const app = express();
const mysql=require('mysql2')
const session=require('express-session');//we crreate a sessin once the user logs in an application /we use a middleware to define the properties needed
const { error } = require("node:console");
//encrypting data >>we use an express encryption method using bcrypt>>encryptd data(passwords by a number of specifed times before storage)

//middleware
app.set("view engine", "ejs");
//setting acces to public files 
app.use(express.static("public"));
//to accept data from forms(url-form headers)
app.use(express.urlencoded({extended:true}))
app.use(
    session({
      secret:'peter',
      resave:'false',
      saveUninitialized :false,
    })
)
//connection our database

const pool=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'student_portal',
    connectionLimit:10,
})
//routes
app.get("/",(req,res)=>{
    res.render('home',{userId:req.session.userId})
})


//sign up route
app.get("/signup",(req,res)=>{
res.render("signup")
})

app.post("/signup",async(req,res)=>{
 const{name,email,password}=req.body

 //check if user has inputted all the credentials 
 if(!name || !email || !password){
    return res.render('signup',{error:"All fields are required for sign up"})
 }
 //we encrypt the password before sending to database
try {
    let hashedPassword=await bcrypt.hash(password,12)

 //send to the database
await pool.query(
    "INSERT INTO users (name,email,password) VALUES(?,?,?,)",
    [name,email,hashedPassword]
);
//once user has signed up we then redirect them to the login page for a successful login 

res.redirect("/login")
} catch (error) {
    return res.render('signup',{error:'check email and password and try again'})
}
console.log(error);
res.render('signup',{error:'something went wrong '})


 

})



app.listen(3000, () => {
  console.log("Student Portal running at http://localhost:3000");
});