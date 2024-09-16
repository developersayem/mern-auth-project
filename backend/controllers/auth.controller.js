import User from "../models/user.model.js"
import bcrypt from "bcryptjs";

import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js"
import { sendVerificationEmail } from "../mailtrap/emails.js";



export const signup = async(req,res)=>{
    //get user data
    const {email,password,name} = req.body;
    try {
        //check user hast provided required data
        if(!email || !password || !name){
            return res.status(400).json({message:"Please fill in all fields"})
        };

        //check if user already exists
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({
                success:false,
                message:"User already exists"});
        };
        //hashed password from security
        const hashedPassword = await bcrypt.hash(password,10);
        //generate verification token
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        //Create new user
        const user = new User({
            email,
            password:hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt:Date.now() + 24 * 60 * 60 * 1000 //24 hours
            });
            await user.save();

        //generate jwt token and set to the cookie
        generateTokenAndSetCookie(res,user._id);

        //send verification email
        await sendVerificationEmail(user.email,verificationToken)
        // send response
        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        });
        };
    };

export const login = async(req,res)=>{
    res.send("login page")
};
export const logout = async(req,res)=>{
    res.send("logout page")
};