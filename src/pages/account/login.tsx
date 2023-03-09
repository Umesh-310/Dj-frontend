import Layout from "@/components/Layout/Layout";
import React, { useContext, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import style from "./Login.module.css";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
const initialState = {
  email: "",
  password: "",
};
const Login = () => {
  const { error, logIn } = useContext(AuthContext);
  const [EmailPass, setEmailPass] = useState(initialState);
  useEffect(() => {}, []);

  const setInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailPass({ ...EmailPass, [event.target.name]: event.target.value });
  };

  const onSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    logIn(EmailPass);
    setEmailPass(initialState);
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
          <FaUser /> Log In
        </h1>
        <form onSubmit={onSubmitHandler}>
          <div>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              name='email'
              value={EmailPass.email}
              onChange={setInput}
              placeholder='email'
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              value={EmailPass.password}
              onChange={setInput}
              placeholder='password'
              autoComplete='on'
            />
          </div>
          <input type='submit' value='Log in' className='btn' />
        </form>
        <p>
          {"Don't have an account? "}
          <Link href={"/account/register"}>Register</Link>
        </p>
      </div>
    </Layout>
  );
};

export default Login;
