const express = require('express');
const { signUp, logIn, getUser } = require('../controllers/userController');
const { createTask, getAllTask, getTaskById, updateTask, deleteTask } = require('../controllers/taskController');
const { isAuth } = require('../middleware/auth');

const router = express.Router()

// user routes

router.post('/signup',signUp)
router.post('/login',logIn)
router.get("/user",isAuth,getUser)

// task routes

router.post("/create-task",isAuth,createTask)
router.get("/all-task",isAuth,getAllTask)
router.get("/task/:id",isAuth ,getTaskById)
router.patch("/task/:id",isAuth,updateTask)
router.delete("/task/:id",isAuth,deleteTask)


// if api is invalid OR wrong URL

router.all("/*", function (req, res) {
    res
      .status(404)
      .send({ status: false, message: "The api you requested is not available" });
  });
  
module.exports =router