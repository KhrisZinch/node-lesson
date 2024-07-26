const fs = require("fs");

const createFile = () => {
  console.log("work heere");
  fs.appendFile(
    "./public/example.txt",
    "Hello world from new file!",
    (err, data) => {
      if (err) throw err;
      console.log("Data is appended");
    }
  );
};

const updateFile = () => {
  fs.writeFile("./public/example.txt", "This is added text", (err) => {
    if (err) throw err;
    console.log("Data is Updatd");
  });
};

const getFile = () => {
  fs.readFile("./public/example.txt", "utf-8", (err, data) => {
    if (err) throw err;

    return data;
  });
};

module.exports = {
  createFile,
  updateFile,
  getFile,
};
