const postService = require("#services/post.service.js");
const { validatePost } = require("#models/post.js");

const get = async (req, res) => {
  res.send(JSON.stringify(await postService.getAllPosts()));
};

const getById = async (req, res) => {
  const { id } = req.params;
  const post = await postService.getById(id);

  if (isNaN(id)) {
    return res.sendStatus(400);
  }

  if (!post) {
    return res.sendStatus(404);
  }

  res.send(post);
};

const create = async (req, res) => {
  const { body } = req;
  const { error } = validatePost(body);

  if (error) {
    res.sendStatus = 400;
    res.send(error.details[0].message);

    return;
  }

  const post = await postService.create(body);

  res.statusCode = 201;
  res.send(post);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { body } = req.body;
  const post = await postService.update({
    id,
    body,
  });

  res.send(post);
};

const remove = async (req, res) => {
  const { id } = req.params;

  if (!postService.getById(id)) {
    return res.sendStatus(404);
  }

  await postService.remove(id);

  res.sendStatus(204);
};

const updateComments = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;

  if (!comment) {
    return res.status(400).send({ error: "Comment is required" });
  }

  const post = await postService.addComment(id, comment);

  res.send(post);
};

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
  updateComments,
};
