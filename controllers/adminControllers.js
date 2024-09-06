const { name } = require("ejs");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const loadLogin = async(req,res)=>{
    try {

        res.render("login")
        
    } catch (error) {
       console.log(error.message);
    }
};

// admin validation
const verifyLogin = async(req,res)=> {
    try {

        const email = req.body.email;
        const password = req.body.password;

        const userData = await User.findOne({email:email});

        if(userData){
           
         const passwordMatch = await bcrypt.compare(password,userData.password);

         if(passwordMatch){

            if(userData.isAdmin === 0){
                res.render("login",{message:"Invalid email and password"});
            }else{
                req.session.user_id = userData._id;
                res.redirect("/admin/home");
            }

        }else{
            res.render("login",{message:"Invalid email and password"}); 
         }

        }else{
            res.render("login",{message:"Invalid email and password"});
        }
        
    } catch (error) {
       console.log(error.message);
        
    }
}


//for admin home

const loadDashboard = async (req, res) => {
    try {
        let search = "";
        if (req.query.search && req.query.search.trim()) {
            search = req.query.search.trim();
        }

        const usersData = await User.find({
            isAdmin: false, 
            $or: [
                {name: {$regex: search, $options: "i"}}
            ]
        });

        res.render("home", {users: usersData});
    } catch (error) {
        console.log(error.message);
    }
};


const logout = async(req,res)=>{
    try {

        req.session.destroy();
        res.redirect("/admin")
        
    } catch (error) {
      console.log(error.message);
        
    }
};

const createUser = async (req,res)=>{
    try {

   res.render("newUser")
        
    } catch (error) {
      console.log(error.message);
        
    }
};

const addUser = async (req,res)=>{
    try {
        const name = req.body.name
        const email = req.body.email;

      const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:0,
        isvarified:0,
        isAdmin:0
        });

        const userData = await user.save();

        if(userData){

            res.render("newUser",{message:"logging sucessfully"})

        }else{
            res.render("newUser",{message:"invalid entry and passord"})
        }


        
    } catch (error) {
        console.log(error.message);
        
    }
};


//for editUser

const editUserLoad = async(req,res)=>{
    try {
        const id = req.query.id;
        const userData = await User.findById({_id:id});
        if(userData){
            res.render("editUser",{user:userData})
        }else{
            res.redirect("/admin/home")
        }
        
        
    } catch (error) {
        console.log(error.message);
        
    }
};

const updateUsers = async (req,res)=>{
    try {

       const userData = await User.findByIdAndUpdate({_id:req.body.id},{$set:{ name:req.body.name,email:req.body.email }})
       res.redirect("/admin/home"); 
    } catch (error) {
      console.log(error.message);
        
    }
};

//for delete users

const removerUser = async (req,res) =>{
    try {
        const id = req.query.id;
       await User.deleteOne({ _id:id });
       res.redirect("/admin/home")
    } catch (error) {
        console.log(error.message);
        
    }
}




module.exports = {
    loadLogin,
     verifyLogin,
     loadDashboard,
     logout,
     createUser,
     addUser,
     editUserLoad,
     updateUsers,
     removerUser
   
}