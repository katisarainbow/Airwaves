import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  creator: String,
  username: String,
  name: String,
  profileImage: String,
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
  comments: { type: [String], default: [] },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model("Post", postSchema);
