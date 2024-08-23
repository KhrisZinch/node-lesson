const Joi = require("joi");
const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  // postId: {
  //   type: Number,
  //   required: true,
  // },
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
  },
  body: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
});
const Comment = new mongoose.model("Comment", commentSchema);

function validateComment(comment) {
  const schema = Joi.object({
    // postId: Joi.number().required(),
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).required(),
    body: Joi.string().min(2).max(100).required(),
  });

  return schema.validate(comment);
}

module.exports.Comment = Comment;
module.exports.validateComment = validateComment;
module.exports.commentSchema = commentSchema;