// const session = require("express-session");
const Users = require("../models/userModel");
const bcrypt = require("bcrypt");

const securePassword = async (password)=>{
    try {
       
        const passwordHash = await bcrypt.hash(password,10)
        return passwordHash;
    } catch (error) {
      console.log(error.message);
        
    }       
}
const loadUser = async(req,res) =>{
    try {
        
    res.render("signup")

    } catch (error) {
        
    console.log(error.message);

    }
}

const insertUser = async (req,res)=>{
    
    try {

     const spassword = await securePassword(req.body.password)

        const user = new Users({
            name:req.body.name,
            email:req.body.email,
            password:spassword,
            isvarified:0,
            isAdmin:0
        });
        const userData = await user.save();

        if(userData){

            res.render("signup",{message:"Your registration has been sucessfull"});
        }else{
            res.render("signup",{message:"Your registration has been failed"});
        }
    
    
    
    } catch (error) {
        console.log(error.message);
        
    }
}

// login user method started

const loginUser = async(req,res)=>{
    try {

        res.render("login")
        
    } catch (error) {
        console.log(error.message);
        
    }
}


const insertLoginUsers = async (req,res)=>{
    try {
       

       const  email = req.body.email
        const password = req.body.password;
        
        const userData = await Users.findOne({email:email});
    
        if(userData){
       const passwordMatch = await bcrypt.compare(password,userData.password);

        if(passwordMatch){
            if(userData.isvarified===0){
                res.render("login",{msg:"login Sucessfully"})
            }else{
                req.session.user_id =userData._id;
                res.redirect("/home");
            }

        }else{
            res.render("login",{msg:"Email and Password is incorrect "})
        }

        }else{
          res.render("login",{msg:"Email and Password is incorrect"})
        }
 
        
    } catch (error) {
        console.log(error.message)
    }
}

const loadHome = async(req,res)=>{
    try {
        res.render("home")
        
    } catch (error) {
       console.log(error.message);
        
    }
}

const userLogout = async(req,res)=>{
try {

    req.session.destroy();
    res.redirect("/login");
    
} catch (error) {
  console.log(error.message);
    
}
};



module.exports = {
    loadUser,
    insertUser,
    loginUser,
    insertLoginUsers,
    loadHome,
    userLogout
 
    
}