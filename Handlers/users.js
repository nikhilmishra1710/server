const bcrypt = require("bcrypt")
const jwt=require("jsonwebtoken")

const User  = require("../Schema/userSchema");

const salt=bcrypt.genSaltSync(10)

const signUp=async (req,res)=>{
    try{
        console.log(req.headers.password,req.body.fname,req.body.sname,req.body.uname)
        const val=req.headers.password
        const pwd=bcrypt.hashSync(val,salt)

        const user={"fname":req.body.fname,"sname":req.body.sname,"username":req.body.uname,"password":pwd}
        console.log(user)
        const newUser=new User(user)
        await newUser.save()
        const token=jwt.sign(newUser.toJSON(),"sadfasdf1864fasdf46as8df78456dsf",{expiresIn:"24h"})
        console.log(token)
        res.status(200).json({"isSuccess":true,"msg":"Signup successful!","token":token})
        
    }catch(error){
        res.status(400).json({"isSuccess":false,"msg":error.message})
    }
}

const login=async (req,res)=>{
    try{
        console.log(req.body.username,req.headers.password)
        const user= await User.findOne({"username":req.body.username})
        console.log(user)

        if(user){
            const match=bcrypt.compare(req.headers.password,user.password)
            if(match){
                const token=jwt.sign(user.toJSON(),"sadfasdf1864fasdf46as8df78456dsf",{expiresIn:"24h"})
                res.status(200).json({"isSuccess":true,"msg":"Login successful!","token":token})
            }else{
                res.status(400).json({"isSuccess":false,"msg":"Password is not correct"})
            }
        }else{
            res.status(400).json({"isSuccess":false,"msg":"No such user found!"})
            return
        }
        
    }catch(error){
        console.log("Error: "+error.message)
        res.status(400).json({"isSuccess":false,"msg":error.message})
    }
}

const validateUserToken=async(req,res)=>{
    try{
        const token=req.headers.token
        console.log(token)
        if (!token) {
            return res.status(403).json({isSuccess:false, msg: 'No token provided.' });
        }
    
        jwt.verify(token, 'sadfasdf1864fasdf46as8df78456dsf', (err, decoded) => { // Replace 'secret_key' with your actual secret key
            if (err) {
                return res.status(401).json({isSuccess:false, msg: 'Failed to authenticate token.' });
            }else{
                console.log("token verified")
                return res.status(200).json({isSuccess:true, msg: 'Token verified' });
            }
        }
        );
    }catch(error){
        return res.status(401).json({isSuccess:false, msg: 'Failed to authenticate token.' });
    }
}

module.exports= {signUp,login, validateUserToken};