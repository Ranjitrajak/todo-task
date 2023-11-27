// import add from "../assets/add.png"
// import user from "../assets/user.png"
// import {FiChevronDown} from "react-icons/fi"
import { useState } from "react";
import Modal from "./Modal";
import { IoLogOut } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/Slices/AuthSlice";

// import Modal from "./Modal"

function Header() {
  const dispatch = useDispatch();

  const createTodo = () => {
    setOpenModal(true);
    setCreateTask(true);
  };
  const remove = () => {
    dispatch(logout());
    window.location.href = "/login";
  };

  const [openModal, setOpenModal] = useState(false);
  const [createTask, setCreateTask] = useState(false);

  return (
    <div className="flex items-center gap-2 h-full w-full bg-navbar bg-slate-400 justify-between">
      <div className="flex h-[50%] items-center">
        <div className="text-sm  md:text-bas bg-blue-400 font-bold px-6 md:px-5 py-2 rounded-md">
          <p>Web Developer| Task Management</p>
        </div>
      </div>
      <div className="flex gap-x-5 h-[50%] items-center mr-6">
        <button
          className="flex gap-x-2 rounded-full text-sm md:text-base px-2 md:px-5 py-1 md:py-2 text-white items-center bg-green-500 bg-button"
          onClick={createTodo}
        >
          <p>Create Task</p>
        </button>
        <IoLogOut className="w-8 h-6" onClick={remove} />
      </div>

      {openModal && (
        <Modal
          createTask={createTask}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      )}
    </div>
  );
}

export default Header;
