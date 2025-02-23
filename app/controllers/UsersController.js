import UsersModel from "../model/UsersModel.js";
import { TokenEncode } from "../utility/tokenUtility.js";
import SendEmail from "../utility/emailUtility.js"

export const Registration = async (req, res) => {

    try{
        let reqBody = req.body;
        await UsersModel.create(reqBody);
        return res.json({status:'success', "message": "User Registration successfully registered"})
    }catch(err){
        return res.json({status:'error', "message": err.toString()});
    }
};

// 1
export const Login = async (req, res) => {
    try{
        let reqBody = req.body;
        let user = await UsersModel.findOne(reqBody);
        if(user){
            let token = TokenEncode(user.email, user['_id']);
            return res.json({status:'success', "message": "User Login successfully",Token:token});
        }else{
            return res.json({status:'error', "message": "Invalid email or password"})
        }
    }catch(err){
        return res.json({status:'error', "message": err.toString()});
    }
};

export const ProfileDetails = async (req, res) => {
    try{
        let user_id = req.headers['user_id'];
        console.log(user_id);
        let data = await UsersModel.findOne({"_id": user_id});
        return res.json({status:'success', "message": "User Profile details",user: data});
    }catch(err){
        return res.json({status:'error', "message": err.toString()});
    }
};

export const ProfileUpdate = async (req, res) => {
    try{
        let user_id = req.headers['user_id'];
        let reqBody = req.body;
        let data = await UsersModel.updateOne({"_id": user_id}, reqBody);
        return res.json({status:'success', "message": "User Profile updated successfully", user: data});
    }catch(err){
        return res.json({status:'error', "message": err.toString()});
    }
}
    

export const EmailVerify = async (req, res) => {
    try {
        let email = req.params.email;
        let data = await UsersModel.findOne({email: email});

        if(data == null){
            return res.json({status:'error', "message": "User not found with this email"});
        } else {
            let code = Math.floor(1000 * Math.random() * 90000);
            let EmailTo = data['email'];
            let EmailSubject = "Task Manager Email Verification Code";
            let EmailText = `Your verification code is: ${code}`;
            await SendEmail(EmailTo, EmailSubject, EmailText);
            await UsersModel.updateOne({email: email}, {otp: code});
            return res.json({status:'success', "message": "User email verified successfully"});
        }
    } catch(err) {
        return res.json({status:'error', "message": err.toString()});
    }
};

export const CodeVerify = async (req, res) => {
    try {
        let email = req.params.email;
    let code = req.params.code;
    let data = await UsersModel.findOne({email: email, otp: code});
    if(data == null){
        return res.json({status:'error', "message": "Invalid verification code or user not found"});
    }else{
        return res.json({status:'success', "message": "User email verified successfully"});
    }
    } catch(err) {
        return res.json({status:'error', "message": err.toString()});
    }
};

export const ResetPassword = async (req, res) => {
    try {
        let reqBody = req.body;
        let data = await UsersModel.findOne({email:reqBody['email'], otp:reqBody['code']});
        if(data == null){
            return res.json({status:'error', "message": "Invalid verification code or user not found"});
        }else{
            await UsersModel.updateOne({email: reqBody['email']}, {otp:0,password: reqBody['password']});
            return res.json({status:'success', "message": "User password reset successfully"})
        }
        
    } catch(err) {
        return res.json({status:'error', "message": err.toString()});
    }
};