import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// دالة لإنشاء التوكين
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export const registerUser  = async (req, res) => {
  try {
    const {name, email, password} = req.body;
    const userExists = await User.findOne({email});

    if(userExists){
      return res.status(400).json({message: "User already exists"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    // توليد التوكين
    const token = generateToken(user._id);

    res.status(201).json({user, token}); // ✅ نرسل المستخدم + التوكين
  } catch(error) {
    console.log(error);
      res.status(500).json({ message: "Server error" });
  }
};


export const login = async (req,res) => {
  try {
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user){
      return res.status(404).json({message:"User not found"});
    }

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
      return res.status(400).json({message:"Incorrect email or password"});
    }

    // توليد التوكين
    const token = generateToken(user._id);

    res.status(200).json({user, token}); // ✅ نرسل المستخدم + التوكين
  } catch(error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
