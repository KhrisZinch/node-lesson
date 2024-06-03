const axios = require("axios");

let allPosts = [];
let postsComments = [];

const init = () => {
  loadAllPosts();
  laodPostsComments();
};

const getAllPosts = () => {
  return allPosts;
};

const getPostsComments = () => {
  return postsComments;
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

const laodPostsComments = () => {
  return axios("https://jsonplaceholder.typicode.com/comments").then(
    (response) => {
      postsComments = response.data;
    }
  );
};

const attachCommentsToPosts = () => {
  postsComments.forEach((comment) => {
    const foundPost = getById(comment.postId);

    if (!foundPost.comments) {
      foundPost.comments = [];
    }

    foundPost.comments.push(comment);
  });
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
  getPostsComments,
  attachCommentsToPosts,
  getById,
  create,
  update,
  remove,
};
