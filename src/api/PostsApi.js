const axios = require("axios");

const loadAllPosts = () => {
  return axios("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.data)
    .catch((error) => { throw new Error('Loading post') });
};

module.exports = {
  loadAllPosts,
};
