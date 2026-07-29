import User from "../models/user.model.js";

export const fetchUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.json({
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, bio } = req.body;
    const newUser = await User.create({ name, email, bio });
    res.json({
      message: "New user created",
      newUser,
    });
  } catch (error) {
    if (error.name === "MongoServerError" && error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        message: "Invalid input",
        errors: `A user with that ${field} already exists`,
      });
    }

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

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, bio } = req.body;
    await User.findByIdAndUpdate(id, { name, bio });
    res.json({
      message: "User updated",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({
      message: "User deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const fetchUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    res.json({
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
