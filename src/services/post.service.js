const { loadAllPosts } = require("#api/PostsApi.js");
const { laodPostsComments } = require("#api/CommentsApi.js");

let allPosts = [];
let postsComments = [];

const init = async () => {
  allPosts = await loadAllPosts();
  postsComments = await laodPostsComments();
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

const attachCommentsToPosts = () => {
  postsComments.forEach((comment) => {
    const foundPost = getById(comment.postId);

    if (!foundPost.comments) {
      foundPost.comments = [];
    }

    foundPost.comments.push(comment);
  });
};

const create = async ({ userId, title, body }) => {
  const newPost = {
    id: allPosts.length + 1,
    userId,
    title,
    body,
  };

  allPosts.push(newPost);

  return newPost;
};

const update = ({ id, author }) => {
  const postToUpdate = getById(id);

  Object.assign(postToUpdate, { author });

  return postToUpdate;
};

const remove = async (id) => {
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
