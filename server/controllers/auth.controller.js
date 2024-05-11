import { User } from "../model/userSchema.js";
import bcrypt from "bcrypt";
import { json } from "express";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      name === "" ||
      email === "" ||
      password === ""
    ) {
      return res.status(400).json({ message: "All field are requred" });
    }
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({ message: "User already exist" });
    }
    const hashPassword = bcrypt.hashSync(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    await user.save();
    // console.log("user data", user);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const userLogin = async (req, res) => {
  try {
    const { user } = req.body;
    console.log(req.body);

    if (
      !user.email ||
      !user.password ||
      user.email === "" ||
      user.password === ""
    ) {
      return res.status(400).json({ message: "All fields not are required" });
    }

    const isValidUser = await User.findOne({ email: user.email });
    if (!isValidUser) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    const isPasswordValid = bcrypt.compareSync(
      user.password,
      isValidUser.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    const token = jwt.sign({ id: isValidUser._id }, process.env.JWT_SECRET);

    const { password: userPassword, ...others } = isValidUser._doc;
    console.log(isValidUser._doc);

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json({ message: "User logged in successfully", token, others });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const googleLogin = async (req, res) => {
  console.log(req.body);
  try {
    const { name, email, profile } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password, ...rest } = user._doc;

      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const genretedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashPassword = bcrypt.hashSync(genretedPassword, 10);

      const newUser = new User({
        // username:
        //   name.toLowerCase().split(" ").join("") +
        //   Math.random().toString(9).slice(-4),
        name,
        email,
        password: hashPassword,
        profile,
      });
      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password, ...rest } = newUser._doc;

      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
