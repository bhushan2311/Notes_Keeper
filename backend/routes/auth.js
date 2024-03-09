// In this file we are creating 
// 1. a new user (/api/auth/createuser')
// 2. allowing the existing user to login using post request('/api/auth/login')
// 3. Get logged in user details using Post (middleware) - Fetching data of user with JWT token

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { check, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const JWT_SECRET = "harryisagood$boy";

const fetchUser = require('../middleware/fetchUser');

// -------------- Router-1 : Create a new User - No login required ----------------
router.post('/api/auth/createuser', [
    check('name', 'Name length should be greater than 3 character').isLength({ min: 3 }),
    check('email', 'Email length should be greater than 5 character').isEmail().isLength({ min: 5 }),
    check('password', 'Password length should be greater than 5 character long').isLength({ min: 5 })
],
    async (req, res) => {

        // validationResult function checks whether any occurs or not and return an object
        const errors = validationResult(req);

        // If some error occurs, then this block of code will run
        try {
            if (!errors.isEmpty()) {
                return res.status(400).json({success:"false",errors:errors.array()});
            }

            // check whether the user with this email already exist
            const emailExist = await User.findOne({ email: req.body.email });
            console.log(emailExist);        // returns null if user is not exist
            if (emailExist) {
                console.log("email existed");
                return res.status(400).json({success:"false",errors:"This email is already exist!"});       // working properly
                // return res.status(400).json({success:"false",error:"This email is already exist!"});     // giving bug
            }
            // console.log("auth......");
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password,salt);

            let user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass            // secure Password
            });

            const data = {
                user:{
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            console.log("auth......",authToken);

            res.status(400).json({success:"false",errors:"ffffffffffffffff"});
            // res.json({success:"true", authToken});
            console.log("meeeeeeeeeeeeeeeeeee2");
            // res.json({success:"true",authToken});  // it is same as this -> res.json({authToken:authToken});  //no need to write this in ES6
        }
        catch (err) {
            console.error(err);
            res.status(500).send("Some error occured");
        }
    })
    



//--------------- Router-2 : Authenticate a new User - No login required  ----------------

router.post('/api/auth/login', async (req,res)=>{
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()});
    }

    const {email,password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success:"false",error:"ePlease try to login with correct credentials"});
        }

        const passCompare = await bcrypt.compare(password,user.password);
        if(!passCompare){
            return res.status(400).json({success:"false",error:"pPlease try to login with correct credentials"});
        }

        const data = {
            user:{
                id:user.id
            }
        }
        // res.json(user);
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({success:"true",authToken});

    } catch (err) {
        console.error(err);
        res.status(500).send("Some error occured");
    }
})

// ---------------- Router-3 : Get logged in user details using Post : Login required (video - 51 CWH)----------------

router.post('/api/auth/getuser', fetchUser , async (req,res)=>{
    try {
        const userId =  req.user.id;                        // 'req.user' coming from fetchUser
        const user = await User.findById(userId).select("-password");       // selecting all the fields of user except password
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

module.exports = router;



// JWT - json web token --> A particular way to verify user



// --------------
/*
User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
}).then(user => res.json(user))
.catch(err=>{
    console.log(err) 
    res.json(
                   {
                    error:"PLease enter unique value"
                   }
                )       
            }
    )
    */
// console.log(req.body);
// const user = User(req.body);
// user.save();
// res.send("hello");
// res.send(req.body);