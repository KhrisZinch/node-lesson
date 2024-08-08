const fs = require("fs");
const path = require("node:path");
const filePath = path.resolve("public", "example.txt");

const createFile = (textContent) => {
  fs.appendFile(filePath, textContent, (err, data) => {
    if (err) throw err;
  });
};

const updateFile = (textContent) => {
  fs.writeFile(filePath, textContent, (err) => {
    if (err) throw err;
  });
};

const getFile = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) reject(err);

      resolve(data);
    });
  });
};

module.exports = {
  createFile,
  updateFile,
  getFile,
};
