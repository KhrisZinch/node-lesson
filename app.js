const express = require("express");
const { postRouter } = require("#routes/posts.route.js");
const { fileRouter } = require("#routes/file.route.js");
const mongoose = require("mongoose");

function createServer() {
  mongoose
    .connect("mongodb://localhost/mentor")
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.error("Could not connect to MongoDB..."));

  const app = express();

  app.use(express.static("public"));
  app.use("/posts", express.json(), postRouter);
  app.use("/file", express.json(), fileRouter);

  return app;
}

const port = process.env.PORT || 3005;

createServer().listen(port, () => console.log(`Listening port ${port}`));
