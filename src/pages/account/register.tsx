import Layout from "@/components/Layout/Layout";
import React, { useEffect, useState, useContext } from "react";
import { FaUser } from "react-icons/fa";

import { AuthContext } from "@/context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import style from "./Login.module.css";
import Link from "next/link";
const initialState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const Register = () => {
  const { error, register } = useContext(AuthContext);
  const [userEmailPass, setUserEmailPass] = useState(initialState);
  useEffect(() => {}, []);

  const setInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmailPass({
      ...userEmailPass,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if (userEmailPass.password !== userEmailPass.confirmPassword) {
      toast.error("Password do not macth!");
      return;
    } else {
      register(userEmailPass);
      setUserEmailPass(initialState);
    }
  };

  useEffect(() => {
    error &&
      toast.error(error, {
        theme: "colored",
      });
  });

  return (
    <Layout>
      <div className={style.auth}>
        <ToastContainer />
        <h1>
          <FaUser /> Register
        </h1>
        <form onSubmit={onSubmitHandler}>
          <div>
            <label htmlFor='username'>User Name</label>
            <input
              type='text'
              name='username'
              value={userEmailPass.username}
              onChange={setInput}
              placeholder='user-name'
            />
          </div>
          <div>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              name='email'
              value={userEmailPass.email}
              onChange={setInput}
              placeholder='email'
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              value={userEmailPass.password}
              onChange={setInput}
              placeholder='password'
              autoComplete='on'
            />
          </div>
          <div>
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <input
              type='password'
              name='confirmPassword'
              value={userEmailPass.confirmPassword}
              onChange={setInput}
              placeholder='confirm password'
              autoComplete='on'
            />
          </div>
          <input type='submit' value='Register' className='btn' />
        </form>
        <p>
          {"Already have an account? "}
          <Link href={"/account/login"}>Log-in</Link>
        </p>
      </div>
    </Layout>
  );
};

export default Register;
