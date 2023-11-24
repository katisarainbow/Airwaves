import mongoose from 'mongoose';
import { Post, Comment } from '../models/post.js';
import User from '../models/user.js';

// POSTS

export const getPosts = async (req, res) => {
  const page = req.query.page || 1;
  const skip = 5 * (page - 1);
  const defaultLimit = 5;

  try {
    const totalCount = await Post.countDocuments();

    const currentPosts = await Post.find()
      .populate('creator')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(defaultLimit);

    res.status(200).json({ data: currentPosts, postLength: totalCount });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getFollowPosts = async (req, res) => {
  const page = req.query.page || 1;
  const userId = req.query.userId;
  const skip = 5 * (page - 1);
  const defaultLimit = 5;

  try {
    const user = await User.findOne({ _id: userId })
      .populate({
        path: 'following',
        populate: { path: 'posts', populate: 'creator' },
      })
      .sort({ 'following.posts.createdAt': -1 })
      .skip(skip)
      .limit(defaultLimit);

    const posts = user.following
      .map((followingUser) => followingUser.posts)
      .flat();
    const totalCount = posts.length;

    res.status(200).json({ data: posts, postLength: totalCount });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getPostsBySearch = async (req, res) => {
  const { searchQuery } = req.query;
  try {
    const posts = await Post.find({
      tags: { $in: searchQuery.split(', ') },
    }).populate('creator');

    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostsByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const posts = await Post.find({ username: username }).populate('creator');

    res.json({ posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostsById = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findOne({ _id: postId })
      .populate('creator')
      .populate({
        path: 'comments',
        populate: 'creator',
      });

    res.json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  try {
    const newPost = new Post({
      ...post,
      createdAt: new Date().toISOString(),
      creator: req.userId,
    });

    const savedPost = await newPost.save();

    const user = await User.findOne({ _id: req.userId });
    user.posts.push(savedPost._id);
    const savedUser = await user.save();

    res.status(201).json({ savedPost, savedUser });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send('No post with that id');
    const updatedPost = await Post.findByIdAndUpdate(
      _id,
      { ...post },
      { new: true }
    );
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.userId) return res.json({ message: 'Unauthenticated' });

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send('No post with that id');

    const post = await Post.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send('No post with that id');

    await Post.findByIdAndRemove(id);
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// COMMENTS

export const commentPost = async (req, res) => {
  const { postId } = req.params;
  const comment = req.body;
  if (!mongoose.Types.ObjectId.isValid(postId))
    return res.status(404).send('No post with that id');

  try {
    const newComment = new Comment({
      ...comment,
      createdAt: new Date().toISOString(),
      creator: req.userId,
    });

    const savedComment = await newComment.save();
    const post = await Post.findOne({ _id: postId });
    post.comments.push(savedComment._id);
    const savedPost = await post.save();
    res.json({ savedComment, savedPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateComment = async (req, res) => {
  const { postId, commentId } = req.params;
  const comment = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(postId))
      return res.status(404).send('No post with that id');

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { ...comment },
      { new: true }
    );

    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  const { postId, commentId } = req.params;

  console.log(postId, commentId);
  try {
    if (!mongoose.Types.ObjectId.isValid(postId))
      return res.status(404).send('No post with that id');

    await Comment.findByIdAndRemove(commentId);

    await Post.findByIdAndUpdate(postId, { $pull: { comments: commentId } });

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const likeComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    if (!req.userId) return res.json({ message: 'Unauthenticated' });

    if (!mongoose.Types.ObjectId.isValid(commentId))
      return res.status(404).send('No comment with that id');

    const comment = await Comment.findById(commentId);

    const index = comment.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      comment.likes.push(req.userId);
    } else {
      comment.likes = comment.likes.filter((id) => id !== String(req.userId));
    }

    const updatedComment = await Comment.findByIdAndUpdate(commentId, comment, {
      new: true,
    });

    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
