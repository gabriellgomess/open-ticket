import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

export const MyContext = createContext();

// Use .env variable for the base URL
const Axios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const MyContextProvider = ({ children }) => {
  const [showLogin, setShowLogin] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [theUser, setTheUser] = useState(null);

  useEffect(() => {
    isLoggedIn();
  }, []);

  const toggleNav = () => {
    setShowLogin(!showLogin);
  };

  const logoutUser = () => {
    localStorage.removeItem("loginToken");
    setIsAuth(false);
    setTheUser(null);
  };

  const registerUser = async (user) => {
    try {
        const register = await Axios.post("/register", {
          name: user.name,
          email: user.email,
          password: user.password,
          password_confirmation: user.password_confirmation,
          phone: user.phone,
          department_id: user.department_id,
          is_admin: user.is_admin,
          access_level: user.access_level
        });
        if (register.status === 201) {
            return { success: true, data: register.data };
        }
    } catch (error) {
        return { success: false, message: error.response.data.error || "Registration failed" };
    }
};

const loginUser = async (user) => {
  try {
      const login = await Axios.post("/login", {
        email: user.email,
        password: user.password,
      });
      if (login.status === 200 && login.data.access_token) {
          localStorage.setItem("loginToken", login.data.access_token);
          await isLoggedIn();
          return { success: true, data: login.data };
      }
  } catch (error) {
      return { success: false, message: error.response.data.error || "Login failed" };
  }
};

  const isLoggedIn = () => {
    const loginToken = localStorage.getItem("loginToken");
    if (loginToken) {
      Axios.defaults.headers.common["Authorization"] = "bearer " + loginToken;

      // Decode the JWT token
      const decodedToken = jwtDecode(loginToken);



      // Assuming the decoded token has a user structure in it
      if (decodedToken) {
        setIsAuth(true);
        setTheUser(decodedToken); // or specific fields like decodedToken.user
        console.log(decodedToken)
      }
    }
  };

  const contextValue = {
    rootState: { showLogin, isAuth, theUser },
    toggleNav,
    isLoggedIn,
    registerUser,
    loginUser,
    logoutUser,
  };

  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContextProvider;
