const axios = require("axios");

let allPosts = [];

const init = () => {
  loadAllPosts();
};

const getAllPosts = () => {
  return allPosts;
};

const getById = (id) => {
  return allPosts.find((item) => item.id === parseInt(id));
};

const loadAllPosts = () => {
  return axios("https://jsonplaceholder.typicode.com/posts").then(
    (response) => {
      allPosts = response.data;
    }
  );
};

const create = ({ userId, title, body }) => {
  const newPost = {
    id: allPosts.length + 1,
    userId: userId,
    title: title,
    body: body,
  };

  allPosts.push(newPost);

  return newPost;
};

const update = ({ id, author }) => {
  const postToUpdate = getById(id);

  Object.assign(postToUpdate, { author });

  return postToUpdate;
};

const remove = (id) => {
  allPosts = allPosts.filter((item) => item.id !== id);
};

module.exports = {
  init,
  getAllPosts,
  getById,
  create,
  update,
  remove,
};
