const Joi = require("joi");
const postService = require("#services/post.service.js");

const get = (req, res) => {
  postService.attachCommentsToPosts();

  res.send(JSON.stringify(postService.getAllPosts()));
};

const getById = (req, res) => {
  const { id } = req.params;
  const post = postService.getById(id);

  if (isNaN(id)) {
    return res.sendStatus(400);
  }

  if (!post) {
    return res.sendStatus(404);
  }

  res.send(post);
};

const create = (req, res) => {
  const { body } = req.body;
  const { error } = validatePost(body);

  if (error) {
    res.sendStatus = 400;
    res.send(error.details[0].message);

    return;
  }

  const post = postService.create(body);

  res.statusCode = 201;
  res.send(post);
};

const validatePost = (post) => {
  const schema = Joi.object({
    body: Joi.string().min(1).required(),
    title: Joi.string().min(1).required(),
    userId: Joi.number().required(),
  });

  return schema.validate(post);
};

const update = (req, res) => {
  const { id } = req.params;
  const { author } = req.body;
  const post = postService.update({
    id,
    author,
  });

  res.send(post);
};

const remove = (req, res) => {
  const id = +req.params.id;

  if (!postService.getById(id)) {
    return res.sendStatus(404);
  }

  postService.remove(id);

  res.sendStatus(204);
};

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
};
