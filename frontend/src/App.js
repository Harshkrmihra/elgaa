import React, { useState, useLayoutEffect, useEffect } from "react";
import { useParams } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import Game from "./pages/Game";
import GameSearch from "./pages/GameSearch";
import Layout from "./pages/Layout";
import AuthBG from "./pages/auth/AuthBG";
import PopupBGDefault from "./components/PopupBGDefault";
import Coach from "./pages/Coach";
import Dashboard from "./pages/Dashboard";
import ExtraLayout from "./pages/ExtraLayout";
import LegalLayout from "./components/Legal/LegalLayout";
import BecomingACoach from "./pages/BecomingACoach";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ProgressBar from "@badrap/bar-of-progress";
import { getAllGames, getAllCoaches } from "./api";
import { UserProvider } from './Context/UserContext';

// Fetch data functions
async function fetchGames() {
  const response = await getAllGames();
  return response.data.map((game) => game.friendlyUrl);
}

async function fetchCoaches() {
  const response = await getAllCoaches();
  return response.data.map((coach) => coach.username);
}

function CustomRoute() {
  const { slug } = useParams();
  const [games, setGames] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const gameData = await fetchGames();
      const coachData = await fetchCoaches();

      setGames(gameData);
      setCoaches(coachData);
      setLoading(false); // Set loading to false after data has been fetched
    };

    fetchData();
  }, []);

  if (loading) {
    // You can replace this with your own loading component or spinner
    return <div>Loading...</div>;
  } else if (games.includes(slug)) {
    return <Game />;
  } else if (coaches.includes(slug.replace("@", ""))) {
    const coachUsername = slug.replace("@", ""); // Extract the coach username from the slug
    return <Coach coachUsername={coachUsername} />; // Pass the coachUsername as a prop to the Coach component
  } else {
    return <Home />; // return the Home component if slug doesn't match game or coach
  }
}

function App() {
  const [loginVisible, setLoginVisible] = useState(false);
  const [signupVisible, setSignupVisible] = useState(false);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    if (localStorage.getItem("language")) {
      setLanguage(localStorage.getItem("language"));
    } else {
      localStorage.setItem("language", language);
    }
  }, []);

  function toggle_login() {
    setLoginVisible(!loginVisible);
    setSignupVisible(false);
  }

  function toggle_signup() {
    setSignupVisible(!signupVisible);
    setLoginVisible(false);
  }

  function close_popup() {
    setSignupVisible(false);
    setLoginVisible(false);
  }

  return (
    <div id="App" dir={language === "ar" ? "rtl" : "ltr"}>
      <BrowserRouter>
      <UserProvider>
        <Wrapper>
          {/* Login Popup */}
          {loginPopUp()}

          {/* Signup Popup */}
          {signupPopUp()}
          <Routes>
            <Route
              path="/"
              element={
                <Layout
                  toggle_login={toggle_login}
                  toggle_signup={toggle_signup}
                />
              }
            >
              <Route index element={<Home />} />
              <Route path="/:slug" element={<CustomRoute />} />
              <Route path="search" element={<GameSearch />} />
              <Route path="join" element={<BecomingACoach />} />
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
            <Route
              path="/terms"
              element={<LegalLayout title="Terms and Conditions" />}
            />
            <Route
              path="/signup"
              element={
                <AuthBG>
                  <Signup />
                </AuthBG>
              }
            />
            <Route
              path="/login"
              element={
                <AuthBG>
                  <Login />
                </AuthBG>
              }
            />
          </Routes>
        </Wrapper>
        </UserProvider>
      </BrowserRouter>
    </div>
  );

  function signupPopUp() {
    return (
      signupVisible && (
        <PopupBGDefault close_popup={close_popup}>
          <Signup toggle_login={toggle_login} toggle_signup={toggle_signup} />
        </PopupBGDefault>
      )
    );
  }

  function loginPopUp() {
    return (
      loginVisible && (
        <PopupBGDefault close_popup={close_popup}>
          <Login toggle_login={toggle_login} toggle_signup={toggle_signup} />
        </PopupBGDefault>
      )
    );
  }
}

const Wrapper = ({ children }) => {
  const progress = new ProgressBar({
    size: 4,
    color: "#FE595E",
    className: "bar-of-progress",
    delay: 80,
  });
  const [prevLocation, setPrevLocation] = useState(null);
  const location = useLocation();

  const handleRouteChange = (url) => {
    progress.start();
  };
  const handleRouteComplete = (url) => {
    progress.finish();
  };

  useEffect(() => {
    if (prevLocation !== location.pathname) {
      setTimeout(() => {
        handleRouteComplete();
      }, 200);
    }
  });

  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
    if (prevLocation !== location.pathname) {
      handleRouteChange();
    }
    setPrevLocation(location.pathname);
  }, [location.pathname]);

  return children;
};

export default App;
