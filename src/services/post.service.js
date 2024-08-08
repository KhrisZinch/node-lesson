const { loadAllPosts } = require("#api/PostsApi.js");
const { laodPostsComments } = require("#api/CommentsApi.js");
const { attachCommentsToPosts } = require("#utils/index.js");

const getAllPosts = async () => {
  const allPosts = await loadAllPosts();
  const postsComments = await laodPostsComments();

  return attachCommentsToPosts(postsComments, allPosts);
};

const getById = async (id) => {
  const allPosts = await getAllPosts();

  return allPosts.find((item) => item.id === parseInt(id));
};

const create = async ({ userId, title, body }) => {
  const allPosts = await getAllPosts();
  const newPost = {
    id: allPosts.length + 1,
    userId,
    title,
    body,
  };

  allPosts.push(newPost);

  return newPost;
};

const update = async ({ id, author }) => {
  const postToUpdate = await getById(id);

  Object.assign(postToUpdate, { author });

  return postToUpdate;
};

const remove = async (id) => {
  let allPosts = await getAllPosts();

  allPosts = allPosts.filter((item) => item.id !== id);
};

module.exports = {
  getAllPosts,
  getById,
  create,
  update,
  remove,
};
