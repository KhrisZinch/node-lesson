const Joi = require("joi");
const mongoose = require("mongoose");
const { commentSchema } = require("#models/comment.js");

const postShema = mongoose.Schema({
  userId: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  body: {
    type: String,
    required: true,
    minlength: 5,
  },
  comments: [commentSchema],
});
const Post = new mongoose.model("Post", postShema);

function validatePost(post) {
  const schema = Joi.object({
    userId: Joi.number().required(),
    title: Joi.string().min(5).max(50).required(),
    body: Joi.string().min(5).required(),
    comments: Joi.array().items(Joi.object()),
  });

  return schema.validate(post);
}

module.exports.Post = Post;
module.exports.validatePost = validatePost;
