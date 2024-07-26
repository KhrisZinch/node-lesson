const fileService = require("#services/file.service.js");

const getFile = async (req, res) => {
  const data = await fileService.getFile();
  console.log(data, "data");

  if (!data) {
    res.statusCode = 204;
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
