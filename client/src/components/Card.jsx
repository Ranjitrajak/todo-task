import { useState } from "react";
import Modal from "./Modal";
// import Modal from "./Modal";

const Card = ({el}) => {

  const [openModal,setOpenModal] = useState(false);
  return (
    <div>
      <div 
        className="w-full  rounded-md mt-10 flex flex-col gap-y-1 p-2 md:p-4 bg-orange-400 cursor-pointer"
        onClick={(e) => setOpenModal(true)}>
        <p className="capitalize"><span className="font-bold"> Title: </span>{el?.title}</p>
        <p className="text-sm  text-justify"><span className="font-bold ">Description: </span>{el?.description}</p>
        <p className="font-bold">Due Date: <span className="font-normal">{new Date(el?.date).toLocaleString()}</span></p>
      </div>
      {openModal && <Modal  openModal={openModal} setOpenModal={setOpenModal} el={el}/>}
    </div>
  )
}

export default Card