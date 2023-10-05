import mongoose, { Schema } from 'mongoose';

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  description: String,
  birthday: Date,
  pronouns: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: String,
  profileImage: String,
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: function () {
        return [this._id];
      },
    },
  ],
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
});

export default mongoose.model('User', userSchema);
