import React, { useState, useContext } from "react";
import blitzcrank_red from "../../assets/blitzcrank-red.png";
import discord from "../../assets/discord.png";
import facebook from "../../assets/facebook.png";
import google from "../../assets/google.png";
import Auth from "./Auth";
import axios from "axios";
import UserContext from "../../Context/UserContext";
function Signup(props) {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [confirm_password, setconfirm_password] = useState();
  const [errorMsg, seterrorMsg] = useState("");
  const { userToken, setUserToken, setIsLoggedIn, setUser } = useContext(UserContext);

  function handleSubmit() {
    console.log(email, password, confirm_password);
    seterrorMsg("");
    if (!email || !password || !confirm_password) {
      seterrorMsg("Kindly Enter all input fields");
      return;
    }
    if (password.length < 6) {
      seterrorMsg("Password Must be more than 6 characters");
      return;
    }
    if (password != confirm_password) {
      seterrorMsg("Confirm Password Does not Matched");
      return;
    }

    var data = {
      username: email,
      email: email,
      password: password,
      type: "Customer",
    };

    axios
      .post(
        `${process.env.REACT_APP_BACKEND_ENDPOINT}/api/users/register`,
        data
      )
      .then((res) => {
        // Handle the response from the backend
        console.log("login Success", res);
        const token = res.data.token;
        setUserToken(token);
        setUser(res.data.user);
        localStorage.setItem("game_token", token);
        localStorage.setItem("game_user", JSON.stringify(res.data.user));
        props.toggle_signup();
        window.location.reload();
        setIsLoggedIn(true);
        // toast.success("Data Saved Successfully");
      })
      .catch((error) => {
        // Handle any error that occurred during the request
        console.error(error);
        seterrorMsg(error.msg);
        // toast.error("Error! Please Try Again");
      });
  }
  return (
    <Auth banner={blitzcrank_red}>
      <h1 className="text-6xl font-koverwatch">Create New Account</h1>
      <div className="mt-8 text-darkgray-100 mb-8 font-oskari">
        Already have an account?{" "}
        <span
          onClick={props.toggle_login}
          className="text-primary-500 cursor-pointer"
        >
          Login
        </span>
      </div>
      <div className="mt-8 text-darkgray-100 mb-8 font-oskari">
        <span
          onClick={props.toggle_login}
          className="text-primary-500 cursor-pointer"
        >
          {errorMsg}
        </span>
      </div>
      <input
        type="text"
        name="email"
        value={email}
        onChange={(e) => {
          setemail(e.target.value);
        }}
        placeholder="Email Address"
        className="w-full focus:bg-darkgray-350 font-oskari py-4 px-8 bg-darkgray-400 outline-none rounded-md"
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => {
          setpassword(e.target.value);
        }}
        placeholder="Password"
        className="w-full focus:bg-darkgray-350 font-oskari mt-4 py-4 px-8 bg-darkgray-400 outline-none rounded-md"
      />
      <input
        type="password"
        value={confirm_password}
        onChange={(e) => {
          setconfirm_password(e.target.value);
        }}
        name="confirm-password"
        placeholder="Confirm Password"
        className="w-full focus:bg-darkgray-350 font-oskari mt-4 py-4 px-8 bg-darkgray-400 outline-none rounded-md"
      />
      <div className="w-full flex mt-8 items-center text-darkgray-300">
        <div className="flex-1 w-full border-t mr-4  border-solid border-darkgray-300"></div>
        OR
        <div className="flex-1 w-full border-t ml-4 border-solid border-darkgray-300"></div>
      </div>
      <div className="grid grid-cols-3 w-full mt-4 gap-4">
        <div className="w-full h-16 bg-darkgray-400 rounded-lg hover:bg-darkgray-350 cursor-pointer flex items-center justify-center">
          <img src={discord} alt="" />
        </div>
        <div className="w-full h-16 bg-darkgray-400 rounded-lg hover:bg-darkgray-350 cursor-pointer flex items-center justify-center">
          <img src={facebook} alt="" />
        </div>
        <div className="w-full h-16 bg-darkgray-400 rounded-lg hover:bg-darkgray-350 cursor-pointer flex items-center justify-center">
          <img src={google} alt="" />
        </div>
      </div>
      <button
        onClick={() => handleSubmit()}
        className="
                    w-full py-4 bg-primary-500 hover:bg-primary-600 text-white font-oskari mt-8 rounded-lg font-bold
                  "
      >
        Sign Up
      </button>
    </Auth>
  );
}

export default Signup;
