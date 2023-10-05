import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';
import mongoose from 'mongoose';

export const getUserAndPosts = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username }).populate('posts');
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateUserData = async (req, res) => {
  const { userId } = req.params;
  const userData = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId))
    return res.status(404).send('No user with that id');

  try {
    const updatedUserData = await User.findByIdAndUpdate(
      userId,
      { ...userData },
      { new: true }
    );
    res.json(updatedUserData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const followUser = async (req, res) => {
  const { userId, userLogId } = req.params;

  console.log(userId);
  console.log(userLogId);

  if (!mongoose.Types.ObjectId.isValid(userId))
    return res.status(404).send('No user with that id');

  if (!mongoose.Types.ObjectId.isValid(userLogId))
    return res.status(404).send('No user with that id');

  try {
    const user = await User.findById(userLogId);

    const index = user.following.findIndex((id) => id === String(userId));

    if (index === -1) {
      user.following.push(userId);
    } else {
      user.following = user.following.filter((id) => id !== String(userId));
    }

    const updatedUser = await User.findByIdAndUpdate(userLogId, user, {
      new: true,
    });
    res.json(updatedUser);
    console.log(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signup = async (req, res) => {
  const { email, password, repeatPassword, username, profileImage, name } =
    req.body;

  try {
    const existingUsername = await User.findOne({ username });

    if (existingUsername)
      return res.status(400).json({ message: 'Username already exist.' });

    const existingEmail = await User.findOne({ email });

    if (existingEmail)
      return res.status(400).json({ message: 'Email already exist.' });

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
      'test',
      { expiresIn: '1h' }
    );

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (!existingUser)
      return res.status(404).json({ message: 'User doesnt exist.' });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { username: existingUser.username, id: existingUser._id },
      'test',
      { expiresIn: '1h' }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
};
