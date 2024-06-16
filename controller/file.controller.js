const fileService = require("../services/file.service");

const getFile = (req, res) => {
  const data = fileService.getFile();
  console.log(data, "data");

  if (!data) {
    res.statusCode = 500;
    res.end("Server error");
    return;
  }

  res.setHeader("Content-type", "text/html");
  res.end(data);
};

const createFile = (req, res) => {
  fileService.createFile();
  res.sendStatus(201);
};

const updateFile = (req, res) => {
  fileService.updateFile();
  res.sendStatus(201);
};

module.exports = {
  getFile,
  createFile,
  updateFile,
};
