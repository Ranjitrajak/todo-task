const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userInput } = require("../input.js");
const userModel = require("../models/userModel.js");

const signUp = async (req, res) => {
  try {
    let value = req.body;
    try {
      value = await userInput.validateAsync(value, { abortEarly: false });
    } catch (err) {
      console.log(err);
      const response = [];
      console.log("err in create user :", JSON.stringify(err));
      await err.details.forEach(async (msg) => {
        console.log({ [msg.context.label]: msg.message.trim() });
        response.push({ [msg.context.label]: msg.message });
      });

      return res.status(400).json({ success: false, message: response });
    }

    // check email is unique

    const uniqueEmail = await userModel.findOne({ email: value.email });
    if (uniqueEmail) {
      return res
        .status(409)
        .send({ success: false, message: "Email already exist" });
    }
    // hashing user password

    const encryptPassword = await bcrypt.hash(value.password, 10);
    value.password = encryptPassword;

    // create user data
    const createUserData = await userModel.create(value);

    // JWT generation using sign function

    const token = jwt.sign(
      {
        email: createUserData.email.toString(),
        userId: createUserData._id,
      },
      "taskmanage",
      {
        expiresIn: "24h",
      }
    );
    return res.status(201).send({
      success: true,
      message: "user created successfully",
      data: { user: createUserData, token: token },
    });
  } catch (err) {
    return res.status(500).send("signup controller" + err);
  }
};

const logIn = async (req, res) => {
  try {
    const credential = req.body;
    const { email, password } = credential;
    //checking for email presence in db
    const checkData = await userModel.findOne({ email });

    //if email not found
    if (!checkData) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }

    //comparing bcrypt password with the password provided by the user

    const validPassword = await bcrypt.compare(password, checkData.password);

    //if password is not valid

    if (!validPassword) {
      return res
        .status(400)
        .send({ success: false, message: "Password is Invalid " });
    }

    const loginCredentials = checkData._id;

    // JWT generation using sign function
    const token = jwt.sign(
      {
        email: checkData.email.toString(),
        userId: loginCredentials,
      },
      "taskmanage",
      {
        expiresIn: "24h",
      }
    );

    res.status(200).send({
      success: true,
      message: "Login Successfull",
      data: { userId: loginCredentials, token: token },
    });
  } catch (err) {
    return res.status(500).send("logIn controller" + err);
  }
};
const getUser = async (req, res) => {
  try {
    const id = req.user._id;
    const findUser = await userModel.findById(id);
    if (!findUser) {
      return res
        .status(404)
        .send({ success: false, message: "user not found" });
    }
    return res.status(200).send({ success: true, data: findUser });
  } catch (err) {
    return res.status(500).send("getuser controller" + err);
  }
};

module.exports = { signUp, logIn, getUser };
