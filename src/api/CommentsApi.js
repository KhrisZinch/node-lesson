const axios = require("axios");

const laodPostsComments = () => {
  return axios("https://jsonplaceholder.typicode.com/comments")
    .then((response) => postsComments = response.data);
};

module.exports = {
  laodPostsComments,
}
