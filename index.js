const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/login_user");

// const session = require("express-session")
const nocache = require("nocache");

const express = require("express");
const app = express();

const path = require("path");
app.use(express.static(path.join(__dirname,"public")));

// app.use(session({
//     saveUninitialized: false,
//     resave: false, 
//     secret: "uyhvbn345jhdnsh463#@#",
    
// }));
app.use(nocache());

//for users routes
const router = require("./routes/userRoutes");
app.use("/",router);

//for admin routes
const adminRoute = require("./routes/adminRoutes");
app.use("/admin",adminRoute);



app.listen("3400",()=>{
    console.log("Server is running on http://localhost:3400");
    
})

