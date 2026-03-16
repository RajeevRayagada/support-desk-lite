const Joi = require("joi");

exports.createTicketSchema = Joi.object({
  title: Joi.string().min(5).max(200).required(),
  description: Joi.string().min(10).required(),
  priority: Joi.string().valid("low","medium","high").required(),
  tags: Joi.array().items(Joi.string())
});

exports.assignTicketSchema = Joi.object({
  agentId: Joi.string().required()
});

exports.statusSchema = Joi.object({
  status: Joi.string().valid("open","in_progress","resolved","closed").required()
});