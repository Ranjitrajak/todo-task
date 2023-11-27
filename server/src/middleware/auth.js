const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const userModel = require("../models/userModel");

module.exports = {
  isAuth: async function (req, res, next) {
    try {
      const token = req.header("token");
      if (!token || token == "undefined" || token == undefined) {
      
        return res
          .status(401)
          .send({
            success: false,
            message: "Token is undefined or not present",
          });
      }
      jwt.verify(token, "taskmanage", async (error, decoded) => {
        if (error) {
          return res
            .status(401)
            .send({ success: false, message: "Token is invalid!" });
        } else {
          const userData = await userModel.findOne({
            _id: new mongoose.Types.ObjectId(decoded.userId),
          });
          if (!userData) {
            res
              .status(401)
              .send({ success: false, message: "invalid api key" });
          }
          req.user = JSON.parse(JSON.stringify(userData));
          next();
        }
      });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send({ code: 500, message: "internal server err" + err });
    }
  },
};
