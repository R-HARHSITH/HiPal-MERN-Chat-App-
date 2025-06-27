import cloudinary from '../config/cloudinary.js';
import { generateToken } from '../config/utils.js';
import User from '../models/usermodel.js';
import bcrypt from 'bcryptjs';
// import { sendEmail } from '../config/email.js';
// import crypto from 'crypto';

export const signup=async(req,res)=>{
    const {fullName,email,password}=req.body;
    try {

        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
          }
      
        if(password.length<6){
            return res.status(400).json({message:"Password must be atleast 6 characters"});
        }
        const user=await User.findOne({email});
        if(user) return res.status(400).json({message:"Email Already exists"});

        const salt= await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        // const otp=crypto.randomInt(100000,999999).toString();
        // const otpExpiry=Date.now()+3*60*1000;

        const newUser=new User({
            fullName:fullName,
            email:email,
            password:hashedPassword,
            // otp:otp,
            // otpExpiry:otpExpiry,
        });
        if(newUser){
            // token generation jwt
            generateToken(newUser._id,res);
            await newUser.save();
            // await sendEmail(email,"OTP for signup",`Your otp is ${otp}.It will expire in 3 minutes`);
            

            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic,
            });
        }
        else{
            res.status(400).json({message:"INvalid user data"});
        }
        // res.status(201).json({
        //     message: "OTP sent to your email. Please verify to complete signup.",
        //     userId: newUser._id, 
        //   });

    } catch (error) {
     console.log("Error in signup controller",error.message);
      res.status(500).json({ message: "Internal server error" });
    }
};

export const login=async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const isPasswordCorrect=await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid Credentials"});
        }
        generateToken(user._id,res);
        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic,
        })
    } catch (error) {
        console.log("Error in login controller",error.message);
        res.status(500).json({message:"Internal server error"});
    }
};

export const logout=(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged out successfully"});
    } catch (error) {
        console.log("Error in logout controller",error.message);
        res.status(500).json({message:"Internal server error"});
    }
};


export const updateProfile=async(req,res)=>{
    try {
        const {profilePic}=req.body;
        const userId=req.user._id;
        if(!profilePic){
            return res.status(400).json({message:"Profile pic is required"});
        }
        const uploadResponse=await cloudinary.uploader.upload(profilePic);
        const updateUser=await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true});
        res.status(200).json(updateUser);
    } catch (error) {
        console.log("error in update profile:",error);
        res.status(500).json({message:"Internal server error"});
    }
}

export const checkAuth=(req,res)=>{
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Errr in check auth controller: ",error.message);
        res.status(500).json({message:"Internal server error"});
    }
}

// export const verifyOtp=async(req,res)=>{
//     const {userId,otp}=req.body;
//     try {
//         const user=await User.findById(userId);
//         if(!user) return res.status(400).json({message:"User not found"});

//         if(user.isVerified) return res.status(400).json({message:"User Already verified"});

//         if (!user.otp || user.otp !== otp || Date.now() > user.otpExpiry) {
//             return res.status(400).json({
//               message: "Invalid or expired OTP. Please request a new OTP.",
//               resendOption: true 
//             });
//           }
        
//         user.isVerified = true;
//         user.otp=undefined;
//         user.otpExpiry=undefined;

//         generateToken(newUser._id,res);
//         await user.save();
//         res.status(200).json({ message: "Account verified successfully" });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Something went wrong. Please try again." });
//     }
// }

// export const resendOtp = async (req, res) => {
//     const { email } = req.body;
  
//     try {
//       const user = await User.findOne({ email });
//       if (!user) return res.status(400).json({ message: "User not found" });
  
//       if (user.isVerified) {
//         return res.status(400).json({ message: "User already verified" });
//       }
//       const otp = crypto.randomInt(100000, 999999).toString(); 
//       const otpExpiry = Date.now() + 3* 60 * 1000; 
  
//       user.otp = otp;
//       user.otpExpiry = otpExpiry;
//       await user.save();
//       await sendEmail(email, "Your OTP for Signup", `Your new OTP is ${otp}. It will expire in 10 minutes.`);
  
//       res.status(200).json({ message: "New OTP sent to your email." });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Something went wrong. Please try again." });
//     }
//   };
  