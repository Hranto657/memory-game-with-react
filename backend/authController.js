const User =  require("./models/User")
const Role = require("./models/Role")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const {validationResult} = require("express-validator")
const {secret} = require("./config")

const generateAccsesToken = (id , roles)=>{
    const payload ={
        id,
        roles
    } 
    return jwt.sign(payload,secret, {expiresIn:"24h"} )
}

class authConroller{
    async registration(req , res){
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({message:"Registration error ", errors})
            }
            const  {username , password} = req.body
            const candidate = await User.findOne({username})
            if(candidate){
                return res.status(400).json({message:"Please change your Username(( cos we have this name in our DB"})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value:"USER"})
            const user = new User({username ,password :hashPassword , roles:[userRole.value]})
            await user.save()
            return res.json({message:"User added correctly ))"})
        } catch (e) {
            res.status(400).json({message:"Registration error"})
        }
    }

    async login(req , res){
        try {
            const  {username , password} = req.body
            const user = await User.findOne({username})
            if(!user){
                res.status(400).json({message:` This user name - ${username} is Invalid `})
            }

            const validPassword = bcrypt.compareSync(password , user.password)
            
            if(!validPassword){
                res.status(400).json({message:` This password is Invalid `})

            }
            const token = generateAccsesToken(user._id , user.roles)
            return res.json({token})

            
        } catch (e) {
            res.status(400).json({message:"Login error"})
            
        }
    }

    async getUsers(req , res){
        try {
            const users = await User.find()
            res.json(users)
        } catch (e) {
            console.log(e)
        }
    }
}


module.exports = new authConroller()



// const userRole = new Role()
// const adminRole = new Role({value:"ADMIN"})
// await userRole.save()
// await adminRole.save()