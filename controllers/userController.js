const bcrypt = require("bcrypt");
const { UserModel } = require("../model/user.model");
const jwt = require("jsonwebtoken")

const registerUser = async(req, res)=>{

    try {
        let {password}= req.body;
        const hash = bcrypt.hashSync(password, 5);
        let payload = new UserModel({...req.body, password:hash});
        await payload.save();
        res.status(201).json({"msg":"register success"})
    } catch (error) {
        res.status(500).json({"msg": "An error occured"})
    }
}

const loginUser = async(req, res)=>{
    try {
        let {email, password}= req.body;
        let isPresent = await UserModel.findOne({email});
        if(!isPresent) return  res.status(500).json({"msg": "no user exist with this credentials"})

        let isPasswordRight = bcrypt.compareSync(password, isPresent.password); // true
        if(!isPasswordRight) return  res.status(500).json({"msg": "wrong password"})

        let token = jwt.sign({ email }, "token",{ expiresIn: '1h' });
        res.status(201).json({"msg":"login success", token})

    } catch (error) {
        res.status(500).json({"msg": "An error occured"})
    }
}

const reset = async(req, res)=>{
    try {
        let {id} =req.params
        let {currentPassword, newPassword} = req.body;

        let user = await UserModel.findById(id);
        if(!user) return  res.status(500).json({"msg": "user is not present register first"})

        let isPasswordRight = bcrypt.compareSync(currentPassword, user.password); // true

        if(isPasswordRight){
            const hash = bcrypt.hashSync(newPassword, 5);
            user.password = hash;
            await user.save();
            res.status(204).json({"msg": "reset success"})
        }else {
            res.status(500).json({"msg": "invalid curret password"})
        }
    } catch (error) {
        res.status(500).json({"msg": "An error occured"})
    }
}

module.exports = {registerUser, loginUser, reset}