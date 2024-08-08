const Joi = require("joi");
const postService = require("#services/post.service.js");

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

const validatePost = (post) => {
  const schema = Joi.object({
    body: Joi.string().min(1).required(),
    title: Joi.string().min(1).required(),
    userId: Joi.number().required(),
  });

  return schema.validate(post);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { author } = req.body;
  const post = await postService.update({
    id,
    author,
  });

  res.send(post);
};

const remove = async (req, res) => {
  const id = +req.params.id;

  if (!postService.getById(id)) {
    return res.sendStatus(404);
  }

  await postService.remove(id);

  res.sendStatus(204);
};

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
};
