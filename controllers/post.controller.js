import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export const fetchPosts = async (req, res) => {
  try {
    const { userId } = req.query;

    const query = {};
    if (userId) {
      query.author = userId;
    }

    const posts = await Post.find(query).populate("author", "name email");

    res.json({
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const fetchPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id).populate("author", "name email");

    res.json({
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const createPost = async (req, res) => {
  try {
    const { content, author } = req.body;

    const existingUser = await User.findById(author);
    if (!existingUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const newPost = await Post.create({ content, author });
    res.json({
      message: `Post created by ${existingUser.name}`,
      postId: newPost._id,
    });
  } catch (error) {
    if (error.name == "ValidationError") {
      const errorMessages = Object.values(error.errors).map(
        (err) => err.message,
      );
      return res.status(400).json({
        message: "Invalid input",
        errors: errorMessages,
      });
    }

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    await Post.findByIdAndUpdate(id, { content });
    res.json({
      message: "Content updated",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    res.json({
      message: "Post deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
