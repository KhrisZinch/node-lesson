const express = require("express");
const { postRouter } = require("#routes/posts.route.js");
const { fileRouter } = require("#routes/file.route.js");

function createServer() {
  const app = express();

  app.use(express.static("public"));
  app.use("/posts", express.json(), postRouter);
  app.use("/file", fileRouter);

  return app;
}

const port = process.env.PORT || 3005;

createServer().listen(port, () => console.log(`Listening port ${port}`));
