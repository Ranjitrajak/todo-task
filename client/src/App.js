import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { fetchUser } from "./Redux/Slices/AuthSlice";
import Cookies from "js-cookie";

export default function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log(isAuthenticated)
  useEffect(() => {
    const token = Cookies.get("access");
    if(token){
      dispatch(fetchUser(token));

    }
  
  }, [dispatch]);
  return (
    <>
    <BrowserRouter>
   <Routes>
   <Route path="/" element={<Signup/>}/>
   <Route path="/login" element={<Login/>}/>  
   <Route
        path="/home"
        element={isAuthenticated ? <Home /> : <Signup/>}
      />

   </Routes>
   </BrowserRouter>
    </>
  )
}

