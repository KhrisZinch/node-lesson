const express = require("express");
const { postRouter } = require("./routes/posts.route");
const postService = require("./services/post.service");

function createServer() {
  postService.init();

  const app = express();

  app.use(express.static("public"));
  app.use("/posts", express.json(), postRouter);

  return app;
}

const port = process.env.PORT || 3005;

createServer().listen(port, () => console.log(`Listening port ${port}`));
