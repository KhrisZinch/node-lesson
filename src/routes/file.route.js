const express = require("express");
const fileController = require("#controller/file.controller.js");
const router = express.Router();

router.get("/", fileController.getFile);
router.get("/create", fileController.createFile);
router.get("/update", fileController.updateFile);

module.exports = {
  fileRouter: router,
};
