const { loadAllPosts } = require("#api/PostsApi.js");
const { laodPostsComments } = require("#api/CommentsApi.js");
const { attachCommentsToPosts } = require("#utils/index.js");
const { Post } = require("#models/post.js");

const getAllPosts = async () => {
  // const allPosts = await loadAllPosts();
  // const postsComments = await laodPostsComments();

  // return attachCommentsToPosts(postsComments, allPosts);

  return await Post.find().sort("title");
};

const getById = async (id) => {
  const post = await Post.findById(id);

  return post;
};

const create = async ({ userId, title, body, comments }) => {
  let newPost = new Post({
    userId,
    title,
    body,
    comments,
  });

  newPost = await newPost.save();

  return newPost;
};

const update = async ({ id, body }) => {
  const postToUpdate = await Post.findByIdAndUpdate(
    id,
    { body },
    { new: true }
  );

  return postToUpdate;
};

const remove = async (id) => {
  const post = await Post.findByIdAndDelete(id);

  return post;
};

const addComment = async (id, comment) => {
  const post = await getById(id);

  post.comments.push(comment);
  post.save();

  return post;
};

module.exports = {
  getAllPosts,
  getById,
  create,
  update,
  remove,
  addComment,
};
