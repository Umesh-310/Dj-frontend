import React, { ReactElement, createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

export const AuthContext = createContext({
  user: null,
  error: null,
  register: (user: any) => {},
  logIn: ({ eamil: identifier, password }: any) => {},
  logOut: () => {},
  checkUser: () => {},
});

const AuthProvider = (props: { children: ReactElement }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkUser();
  }, []);

  const router = useRouter();
  //Registrt user
  const register = async (user: any) => {
    const res = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();
    if (res.ok) {
      setUser(data);
      router.push("/");
    } else {
      setError(data.message);
      setInterval(() => setError(null), 2000);
    }
  };
  //Log in user
  const logIn = async ({ email: identifier, password }: any) => {
    const res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier, password }),
    });

    const data = await res.json();
    if (res.ok) {
      setUser(data);
      router.push("/");
    } else {
      setError(data.message);
      setInterval(() => setError(null), 2000);
    }
  };

  //LogOut user
  const logOut = async () => {
    const res = await fetch("http://localhost:3000/api/logout", {
      method: "POST",
    });
    const data = await res.json();

    if (res.ok) {
      setUser(null);
      router.push("/");
    }
  };

  //Check if user is logged in
  const checkUser = async () => {
    const res = await fetch("http://localhost:3000/api/userCheck");
    const data = await res.json();
    if (res.ok) {
      setUser(data);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        register,
        logIn,
        logOut,
        checkUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
