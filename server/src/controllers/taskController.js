const { taskInputInput, editTaskInput } = require("../input");
const taskModel = require("../models/taskModel");

const createTask = async (req, res) => {
  try {
    let value = req.body;
    try {
      value = await taskInputInput.validateAsync(value, { abortEarly: false });
    } catch (err) {
      console.log(err);
      const response = [];
      console.log("err in create task :", JSON.stringify(err));
      await err.details.forEach(async (msg) => {
        console.log({ [msg.context.label]: msg.message.trim() });
        response.push({ [msg.context.label]: msg.message });
      });

      return res.status(400).json({ success: false, message: response });
    }

    const createTaskData = await taskModel.create({
      ...value,
     userId:req.user._id
    });
    return res.status(201).send({
      success: true,
      message: "task created successfully",
      data: createTaskData,
    });
  } catch (err) {
    return res.status(500).send("task create" + err);
  }
};

// fetch task by userId

const getAllTask = async (req, res) => {
  try {
    const id = req.user._id;
    console.log(id)

    const getTask = await taskModel.find({ userId: id,isDeleted:false });
    console.log(getTask)
    if (getTask.length < 1) {
      return res.status(404).send({ success: false, message: "no task found" });
    }
   
    return res.status(200).send({ success: true, data: getTask });
  } catch (err) {
    return res.status(500).send("get all task " + err);
  }
};

// fetch task by taskId

const getTaskById = async (req, res) => {
  try {
    const id = req.params.id;
    const getTask = await taskModel.findOne({ _id: id, isDeleted: false });
    if (!getTask) {
      return res.status(404).send({ success: false, message: "no task found" });
    }
    return res.status(200).send({ success: true, data: getTask });
  } catch (err) {
    return res.status(500).send("get single task " + err);
  }
};

// update task by taskId

const updateTask = async (req, res) => {
  try {
    let value = req.body;
    console.log(value)
    try {
      value = await editTaskInput.validateAsync(value, { abortEarly: false });
    } catch (err) {
      console.log(err);
      const response = [];
      console.log("err in update task :", JSON.stringify(err));
      await err.details.forEach(async (msg) => {
        console.log({ [msg.context.label]: msg.message.trim() });
        response.push({ [msg.context.label]: msg.message });
      });

      return res.status(400).json({ success: false, message: response });
    }
    let updatedtask = await taskModel.findOneAndUpdate(
      { _id: req.params.id,isDeleted:false},
      value,
      { new: true }
    );
    if (!updatedtask) {
     return res.status(404).send({ success: false, message: "task not updated" });
    }
    console.log(updatedtask)
   return res
      .status(200)
      .send({ success: true, message: "task updated", data: updatedtask });
  } catch (err) {
    return res.status(500).send("update task " + err);
  }
};

// delete task by Id

const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteTask = await taskModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );
    if (!deleteTask) {
     return res.status(404).send({ success: false, message: "task not found" });
    }
    return res
      .status(200)
      .send({ success: true, message: "task delete successfully",data:deleteTask });
  } catch (err) {
    return res.status(500).send("delete task " + err);
  }
};

module.exports = {
  createTask,
  getAllTask,
  getTaskById,
  updateTask,
  deleteTask,
};
