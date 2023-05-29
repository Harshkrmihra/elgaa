import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userToken, setUserToken] = useState("");
  const [user, setUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add loggedIn state

  useEffect(() => {
    const token = localStorage.getItem("game_token");
    const storedUser = localStorage.getItem("game_user");
    if (token && storedUser) {
      setUserToken(token);
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true); // Mark loggedIn as true if token and user exist
    }
  }, [isLoggedIn]);

  const handleLogin = (token, userData) => {
    setIsLoggedIn(true); // Mark loggedIn as true
    // setUserToken(token);
    // setUser(userData);
    // localStorage.setItem("game_token", token);
    // localStorage.setItem("game_user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUserToken("");
    setUser("");
    setIsLoggedIn(false); // Mark loggedIn as false
    localStorage.removeItem("game_token");
    localStorage.removeItem("game_user");
  };

  return (
    <UserContext.Provider
      value={{ userToken, setUserToken, setUser, isLoggedIn, handleLogin, handleLogout, user }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
