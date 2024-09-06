const express = require("express");

const session = require("express-session")

const router = express();

const bodyParser = require("body-parser");

const userController = require("../controllers/userControllers");

const auth = require("../middleware/auth");

router.use(session({
    resave:false,
    secret:"hjnmkm,#$%^JKMNmm",
    saveUninitialized:false
}))

router.use(bodyParser.json());

router.use(bodyParser.urlencoded({extended:true}));


router.set("view engine","ejs");

router.set("views","./views/users")


//route for user

router.get("/register",auth.isLogout,userController.loadUser);
router.post("/register",userController.insertUser);

//route for login
router.get("/",auth.isLogout,userController.loginUser)
router.get("/login",auth.isLogout,userController.loginUser);
router.post("/login",userController.insertLoginUsers);
router.get("/home",auth.isLogin,userController.loadHome);
router.get("/logout",auth.isLogin,userController.userLogout);



module.exports = router;

