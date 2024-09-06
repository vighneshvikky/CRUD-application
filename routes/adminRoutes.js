const express = require("express");
const adminRouter = express();

const session = require("express-session");
const config = require("../config/config");
adminRouter.use(session({
    secret:config.sessionSecret,
    resave:false,
    saveUninitialized:false
}))

const auth = require("../middleware/adminAuth");
const bodyParser = require("body-parser");
adminRouter.use(bodyParser.json());
adminRouter.use(bodyParser.urlencoded({extended:true}));

adminRouter.set("view engine","ejs");
adminRouter.set("views","./views/admin");


const adminController = require("../controllers/adminControllers")
adminRouter.get("/",auth.isLogout   ,adminController.loadLogin);
adminRouter.post("/",adminController.verifyLogin);
//adminRouter.post("/",adminController.loadHome)


adminRouter.get("/home",adminController.loadDashboard);
adminRouter.get("/logout",auth.isLogin,adminController.logout);
adminRouter.get("/createNewUser",auth.isLogin,adminController.createUser);
adminRouter.post("/createNewUser",adminController.addUser);


//for edit users
adminRouter.get("/editUser",auth.isLogin,adminController.editUserLoad);
adminRouter.post("/editUser",adminController.updateUsers);


//for remove userrs

adminRouter.get("/removeUser",adminController.removerUser);


adminRouter.get("*",(req,res)=>{
    res.redirect("/admin")
})

module.exports = adminRouter;   
