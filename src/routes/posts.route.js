const express = require("express");
const postController = require("#controller/post.controller.js");
const router = express.Router();

router.get("/", postController.get);
router.get("/:id", postController.getById);
router.post("/", postController.create);
router.put("/:id", postController.update);
router.patch("/:id/comments", postController.updateComments);
router.delete("/:id", postController.remove);

module.exports = {
  postRouter: router,
};
