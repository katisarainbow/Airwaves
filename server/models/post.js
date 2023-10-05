import mongoose, { Schema } from 'mongoose';

const commentsSchema = new Schema({
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  comment: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  likes: {
    type: [String],
    default: [],
  },
});

const postSchema = new Schema({
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  tags: [String],
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export const Post = mongoose.model('Post', postSchema);
export const Comment = mongoose.model('Comment', commentsSchema);
