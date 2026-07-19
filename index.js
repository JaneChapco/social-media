import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({
    app: "Social Media App",
    now: new Date().toLocaleString(),
  });
});

app.listen(3000, () => {
  console.log("Social Media App server is up 🚀");
});
