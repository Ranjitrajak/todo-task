import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo, updateTodo, deleteTodo } from "../Redux/Slices/TodoSlice";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";

const Modal = ({ setOpenModal, createTask = false, el = null }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const [taskData, setTaskData] = useState({
    title: el ? el.title : "",
    description: el ? el.description : "",
    status: el ? el.status : "",
    date: el ? el.date : "",
  });
  const handleDelete = async () => {
    try {
      setError("");
      const id = el?._id;
      console.log(id);
      dispatch(deleteTodo(id));
      setOpenModal(false);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        alert(error.response.data.message);
      }
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setTaskData((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      //   setIsLoading(true);
      setError("");
      //   setIsError(false);

      const id = el?._id;
      console.log(id);
      dispatch(updateTodo({ todo: taskData, id }));
      setOpenModal(false);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        alert(error.response.data.message);
      }
    }
  };

  const handleCreate = async () => {
    try {
      setError("");
      //   setIsError(false);
      dispatch(addTodo(taskData));
      setOpenModal(false);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        alert(error.response.data.message);
      }
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black backdrop-blur-[2px] bg-opacity-30 flex justify-center items-center z-[999]">
        <div className="bg-white flex flex-col justify-around w-[300px] md:w-[500px] h-[600px] rounded-md p-10 gap-y-5">
          <h2 className="text-xl font-bold">
            {createTask
              ? "Create a Task for the team"
              : "Edit task for the Team"}
          </h2>
          <div className="bg-black w-full h-[1px]"></div>

          <div className="w-full">
            <label>
              <p>Title</p>
              <input
                type="text"
                className="bg-box border border-gray-500 w-full  px-4 py-2 rounded-md my-2 outline-none"
                placeholder="Title"
                value={taskData.title}
                name="title"
                {...register("title", {
                  required: { value: true, message: "title is required" },
                })}
                onChange={(e) => handleChange(e)}
                error={Boolean(errors?.title)}
              />
            </label>
            {errors?.title?.message && (
              <p className="text-sm text-red-500">{errors?.title?.message}</p>
            )}
          </div>
          <div>
            <label>
              <p>Add task description</p>
              <textarea
                className="bg-box border border-gray-500 w-full h-[5rem] px-4 py-2 rounded-md my-2 outline-none"
                placeholder="feed the task guidelines and information"
                value={taskData.description}
                name="description"
                {...register("description", {
                  required: { value: true, message: "description is required" },
                })}
                onChange={(e) => handleChange(e)}
                error={Boolean(errors?.description)}
              />
            </label>
            {errors?.description?.message && (
              <p className="text-sm text-red-500">
                {errors?.description?.message}
              </p>
            )}
          </div>

          <div className="w-full">
            <p>Select Task Status</p>
            <select
              className="bg-box rounded-md border border-gray-500 px-4 py-2 outline-none w-full mt-2"
              value={taskData.status}
              name="status"
              {...register("status", {
                required: { value: true, message: "status is required" },
              })}
              error={Boolean(errors?.status)}
              onChange={handleChange}
            >
              <option value="Select Todo State">Select todo state</option>
              <option value="Todo">To do</option>
              <option value="Inprogress">In Progress</option>
              <option value="Completed">Task Done</option>
            </select>

            {errors?.status?.message && (
              <p className="text-sm text-red-500">{errors?.status?.message}</p>
            )}
          </div>

          <div className="w-full">
            <p>Due Date</p>

            <input
              type="date"
              className="bg-box px-5 py-2 border border-gray-500 text-black opacity-50 w-10/12 md:w-[50%] mt-2"
              value={
                taskData.date
                  ? new Date(taskData.date).toISOString().split("T")[0]
                  : ""
              }
              {...register("date", {
                required: { value: true, message: "date is required" },
              })}
              onChange={handleChange}
              name="date"
            />
            {errors?.date?.message && (
              <p className="text-sm text-red-500">{errors?.date?.message}</p>
            )}
          </div>

          {createTask ? (
            <div className="flex gap-2 flex-wrap">
              <button
                className="px-5 py-2 rounded bg-green-500 text-white"
                onClick={handleSubmit(handleCreate)}
              >
                Create Task
              </button>
              <button
                className="px-5 py-2 rounded bg-blue-400 bg-opacity-50 text-white"
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex gap-2 flex-wrap items-center ">
              <button
                className="px-5 py-2 rounded bg-red-600 text-white"
                onClick={handleSubmit(handleDelete)}
              >
                Delete Task
              </button>
              <button
                className="px-5 py-2 rounded bg-blue-500 text-white"
                onClick={handleSubmit(handleUpdate)}
              >
                Update Task
              </button>
              <button
                className="px-5 py-2 rounded bg-blue-400 bg-opacity-50 text-white"
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Modal;
