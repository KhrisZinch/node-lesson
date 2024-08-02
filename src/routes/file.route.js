const express = require("express");
const fileController = require("#controller/file.controller.js");
const router = express.Router();

router.get("/", fileController.getFile);
router.post("/", fileController.createFile);
router.put("/update", fileController.updateFile);

module.exports = {
  fileRouter: router,
};
