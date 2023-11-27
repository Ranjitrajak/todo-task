import React, { useEffect } from "react";
import Header from "./Header";
import CardContainer from "./CardContainer";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../Redux/Slices/TodoSlice";

const Home = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.items);

  useEffect(() => {
  
    dispatch(fetchTodos());
  }, [dispatch]);

  const status = ["Todo", "Inprogress", "Completed"];

  return (
    <>
    <div className="min-h-screen">
    <Header />
    <div className="flex items-center justify-center h-full w-full mt-10 mx-6">
        <div className="grid gap-5  grid-cols-1 md:grid-cols-3   place-items-cente">
        {
          status.map((el) =>{
            return <CardContainer el={el} todos={todos} key={el}/>
          })
        }
        </div>
      </div>

    </div>
    
      
     
    </>
  );
};

export default Home;
