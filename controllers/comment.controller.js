import Comment from "../models/comment.model.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export const fetchComments = async (req, res) => {
  try {
    const { commentId } = req.query;

    const query = {};
    if (commentId) {
      query.author = userId;
    }

    const comments = await Comment.find(query).populate("author", "name email");

    res.json({
      count: comments.length,
      data: comments,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const fetchComment = async (req, res) => {
  try {
    const { postId } = req.query;

    if (!postId) {
      return res.status(400).json({
        message: "Please provide a postId as query parameter",
      });
    }

    const post = await Post.findById(postId).populate("author", "name email");
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const comments = await Comment.find({ post: postId })
      .select("-_id content author")
      .populate("author", "-_id name");

    const result = {
      postId: post._id,
      content: post.content,
      author: post.author.name,
      comments: comments.map((comment) => ({
        content: comment.content,
        author: comment.author.name,
      })),
    };

    res.json({
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const createComment = async (req, res) => {
  try {
    const { content, author, post } = req.body;

    const existingUser = await User.findById(author);
    if (!existingUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const existingPost = await Post.findById(post);
    if (!existingPost) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const newComment = await Comment.create({ content, author, post });
    res.json({
      message: `Comment created by ${existingUser.name}`,
      commentId: newComment._id,
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

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    await Comment.findByIdAndDelete(id);
    res.json({
      message: "Comment deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
