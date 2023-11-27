const Joi = require ('joi')

const userInput = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password:Joi.string().min(8).max(12).required()
  }).options({allowUnknown: false});

  const taskInput = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    date: Joi.string(),
    status: Joi.string().valid("Todo", "Inprogress", "Completed", "Cancelled")
  }).options({allowUnknown: true});

  
  const editTaskInput = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    date: Joi.string(),
    status: Joi.string().valid("Todo", "Inprogress", "Completed", "Cancelled")
  }).options({allowUnknown: true});


  module.exports = {
    userInput: userInput,
    taskInputInput: taskInput,
    editTaskInput:editTaskInput
  };