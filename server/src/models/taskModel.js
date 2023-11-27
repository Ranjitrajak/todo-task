const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    date: { type: Date, required: true, trim: true },
    status: {
      type: String,
      default: "Pending",
      enum: ["Todo", "Inprogress", "Completed", "Cancelled"],
      trim: true,
    },
    userId: { type: ObjectId, ref: "User", required: true, trim: true },
    isDeleted:{type:Boolean,default:false}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
