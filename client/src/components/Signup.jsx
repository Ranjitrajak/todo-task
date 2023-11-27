import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Alert, Spinner } from "@material-tailwind/react";
import { useForm } from "react-hook-form";

const Signup = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error2, setError2] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const signup = async () => {
    try {
      setIsLoading(true);
      setError("");
      setIsError(false);
      const response = await axios.post(
        `http://localhost:4000/signup`,
        {
          firstName: fname,
          lastName: lname,
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      console.log({data});
      if (data.success === true) {
        setIsLoading(false);
        Cookies.set("access", data.data.token);
        Cookies.set("userId", data.data.user._id);
        window.location.href = "/home";
      } else {
        setError2(data.message);
        alert(data.message);
        setIsError(true);
        setIsLoading(false);
      }
    } catch (error) {
      if (error.response) {
        setError2(error.response.data.message);
        setIsError(true);
        setIsLoading(false);
      }
    }
  };
  return (
    <>
      <div className="flex flex-col gap-3 justify-center items-center w-full h-screen bg-slate-300">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {isError && (
            <Alert color="red" className="w-fit text-red-500">
              {error2}
            </Alert>
          )}
          <div class="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="firstname"
            >
              Firstname
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-gray-400 focus:shadow-outline"
              id="firstname"
              type="text"
              placeholder="firstname"
              {...register("firstName", {
                required: { value: true, message: "First Name is required" },
              })}
              error={Boolean(errors?.firstName)}
              onInput={(e) => setFname(e.target.value)}
            />
            {errors?.firstName?.message && (
              <p className="text-sm text-red-500">
                {errors?.firstName?.message}
              </p>
            )}
          </div>
          <div class="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="lastname"
            >
              Lastname
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-gray-400 focus:shadow-outline"
              id="lastname"
              type="text"
              placeholder="lastname"
              {...register("lastName", {
                required: { value: true, message: "Last Name is required" },
              })}
              error={Boolean(errors?.lastName)}
              onInput={(e) => setLname(e.target.value)}
            />
            {errors?.lastName?.message && (
              <p className="text-sm text-red-500">
                {errors?.lastName?.message}
              </p>
            )}
          </div>
          <div class="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-gray-400 focus:shadow-outline"
              id="email"
              type="text"
              placeholder="email"
              {...register("email", {
                required: { value: true, message: "Email is required" },
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              error={Boolean(errors?.email)}
              onInput={(e) => setEmail(e.target.value)}
            />
            {errors?.email?.message && (
              <p className="text-sm text-red-500">{errors?.email?.message}</p>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-gray-400 focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              {...register("password", {
                required: { value: true, message: "password is required" },
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
                maxLength: {
                  value: 12,
                  message: "Password must be at most 12 characters long",
                },
              })}
              error={Boolean(errors?.password)}
              onInput={(e) => setPassword(e.target.value)}
            />
            {errors?.password?.message && (
              <p className="text-sm text-red-500">
                {errors?.password?.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleSubmit(signup)}
            >
              {isLoading ? <Spinner className="mx-auto h-4 w-4" /> : "Signin"}
            </button>
            <div className="ml-4">
              <p className="text-xs text-gray-400"> Already have an account?</p>
              <a
                className="inline-block underline align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                href="/login"
              >
                Login
              </a>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
