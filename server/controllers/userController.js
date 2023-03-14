import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (!existingUser)
      return res.status(404).json({ message: "User doesnt exist." });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { username: existingUser.username, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const signup = async (req, res) => {
  const { email, password, repeatPassword, username, profileImage, name } =
    req.body;

  try {
    const existingUsername = await User.findOne({ username });

    if (existingUsername)
      return res.status(400).json({ message: "Username already exist." });

    const existingEmail = await User.findOne({ email });

    if (existingEmail)
      return res.status(400).json({ message: "Email already exist." });

    if (password !== repeatPassword)
      return res.status(404).json({ message: "Passwords don't match." });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      username,
      name,
      profileImage,
    });

    const token = jwt.sign(
      { username: result.username, id: result._id },
      "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
