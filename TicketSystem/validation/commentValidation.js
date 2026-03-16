const Joi = require("joi");

exports.commentSchema = Joi.object({
  message: Joi.string().min(1).required(),
  internal: Joi.boolean().default(false)
});