const express = require("express");
const postController = require("../controller/post.controller");
const router = express.Router();
const fs = require("fs");

router.get("/", postController.get);
router.get("/:id", postController.getById);
router.post("/", postController.create);
router.put("/:id", postController.update);
router.delete("/:id", postController.remove);

// router.get("/download", (req, res) => {
//   fs.readFile("./public/example.txt", "utf-8", (err, data) => {
//     if (err) {
//       res.statusCode = 500;
//       res.end("Server error");
//       return;
//     }

//     res.setHeader("Content-type", "text/html");
//     // res.setHeader("Content-Disposition", "attachment; filename=text.txt");
//     res.end(data);
//   });
// });

module.exports = {
  postRouter: router,
};
