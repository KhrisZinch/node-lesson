const express = require("express");
const app = express();
const axios = require("axios");
const fs = require("fs");

app.use(express.json());
app.use(express.static("public"));
let allPosts = [];

app.get("/posts", async (req, res) => {
  allPosts = await getAllPosts();

  res.send(JSON.stringify(allPosts));
});

app.put("/posts/:id", async (req, res) => {
  allPosts = await getAllPosts();

  const post = allPosts.find((item) => item.id === parseInt(req.params.id));

  if (!post) return res.status(404).send("the post was not found");

  post.author = req.body.author;
  res.send(post);
});

function getAllPosts() {
  return axios("https://jsonplaceholder.typicode.com/posts").then(
    (response) => response.data
  );
}

app.get("/download", (req, res) => {
  fs.readFile("./public/example.txt", "utf-8", (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.end("Server error");
      return;
    }

    res.setHeader("Content-type", "text/html");
    // res.setHeader("Content-Disposition", "attachment; filename=text.txt");
    res.end(data);
  });
});

const port = process.env.PORT || 3005;

app.listen(port, () => console.log(`Listening port ${port}`));
