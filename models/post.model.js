import mongoose from "mongoose";
import User from "./user.model.js";

const postSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 30,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: User,
  },
});

const Post = mongoose.model("Post", postSchema);

export default Post;
