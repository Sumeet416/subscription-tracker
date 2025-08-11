import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken"
import { JWT_EXPIRE, JWT_SECRET } from "../config/env.js";
 

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const {name, email, password} = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // cheching if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("User already exists.");
      error.statusCode = 409;
      throw error
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create([{
      name,
      email,
      password: hashedPassword,
      // createdAt: Date.now,
      // updatedAt: Date.now
    }], { session });

    const token = jwt.sign({ userId: newUser[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRE });

    await session.commitTransaction();
    session.endSession();
    res.status(201).json({ 
      success: true,
      message: 'User registered successfully', 
      data: {
        token,
        newUser: newUser[0]
      } 
    });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
}

export const signIn = async (req, res, next) => {
try{
  const {email, password} = req.body;
  const user = await User.findOne({email}).select('+password');
  if (!user){
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if(!isPasswordValid){
    const error = new Error('Invalid Password');
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: JWT_EXPIRE});

  // Remove password from the user object before sending it in the response
  const { password: hashedPassword, ...rest} = user._doc;

  res.cookie('token', token, {
    httpOnly: true,
    expire: new Date(Date.now() + 24*60*60*1000), //24hour
    secure: process.env.NODE_ENV === 'development',
  });


  res.status(202).json({
    success: true,
    message: 'User signed in successfully', 
    user: rest,
  });

} catch(error) {
  next(error);
  }
}

export const signOut = async (req, res, next) => {
  try{
    res.clearCookie('token');
    res.status(200).json( {success: true, message: 'Sign out successfully.'} );
  } catch (error) {
    next(error);
  }
}
