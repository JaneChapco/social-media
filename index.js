import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";

const { PORT, MONGODB_URL } = process.env;

const app = express();
app.use(express.urlencoded());
app.use(express.json());
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

app.get("/", (req, res) => {
  res.json({
    app: "Social Media App",
    now: new Date().toLocaleString(),
  });
});

await mongoose.connect(MONGODB_URL);
console.log("Database connection established 🚀");

app.listen(PORT, () => {
  console.log(`Social Media App server is up on http://localhost:${PORT} 🚀`);
});
