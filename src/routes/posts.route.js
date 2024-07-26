const express = require("express");
const postController = require("#controller/post.controller.js");
const router = express.Router();
const postService = require("#services/post.service.js");

router.use(async (req, res, next) => {
  try {
    await postService.init();
    next();
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});
router.get("/", postController.get);
router.get("/:id", postController.getById);
router.post("/", postController.create);
router.put("/:id", postController.update);
router.delete("/:id", postController.remove);

module.exports = {
  postRouter: router,
};
