import {
  Typography,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import TextInput from "../components/TextInput";
import InfoContext from "../context/InfoContext";
import "./Login.css";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import ActionButton from "../components/ActionButton";
import axios from "axios";

function Login() {
  const [code, changeCode] = useState("");
  const [password, changePassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [Message, setMessage] = useState("");

  const { isLoggedIn, setLoggedIn, setTeamCode, setAuthToken, setUserType } = useContext(
    InfoContext
  );
  const [isLoading, setLoading] = useState(false);
  const backend = process.env.REACT_APP_BACKEND_URL;

  const handleCodeChange = (event) => {
    changeCode(event.target.value);
  };

  const handlePasswordChange = (event) => {
    changePassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const keyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    const url = `${backend}/team/login`;
    setLoading(true);
    const data = {
      code,
      password,
    };
    console.log(url, data);
    try {
      await axios.post(url, data)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setAuthToken(res.data.token);
            setUserType(res.data.teamDetails.userType);
            setLoggedIn(true);
            setTeamCode(res.data.teamDetails.code);
            localStorage.setItem("authToken", res.data.token);
            localStorage.setItem("userType", res.data.teamDetails.userType);
            localStorage.setItem("teamCode", res.data.teamDetails.code);
            setRedirect(true);
          }
          else {
            setMessage(res.data.message);
          }
        });
    }
    catch (error) {
      console.log(error);
      changePassword("");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (localStorage.getItem('authToken') !== null) {
      setRedirect(true);
    }
  }, [isLoggedIn]);

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <div className="page-container">
      <div className="inner-data">
        <Typography variant="h3" color="primary" className="login-head">
          LOGIN
        </Typography>
        <form className="form">
          <TextInput
            id="TC"
            label="Team Code"
            type="text"
            className="form-input"
            variant="outlined"
            value={code}
            onChange={handleCodeChange}
          />
          <br />
          <TextInput
            id="password"
            type={showPassword ? "text" : "password"}
            label="Password"
            className="form-input"
            variant="outlined"
            value={password}
            onChange={handlePasswordChange}
            onKeyPress={keyPress}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="show password"
                    onClick={togglePasswordVisibility}
                    edge="end"
                    className="view-pass-icon"
                  >
                    {showPassword ? (
                      <Visibility />
                    ) : (
                        <VisibilityOff />
                      )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          ></TextInput>
        </form>
        <br />
        <Typography variant="h5" color="secondary">
          {Message}
        </Typography>
        <br />
        <div className="login-btn-div">
          <ActionButton
            className="login-btn"
            onClick={handleSubmit}
            disabled={isLoading ? true : false}
            children={!isLoading ? (
              "LOGIN"
            ) : (
                <CircularProgress
                  color="secondary"
                  size={20}
                  thickness={5}
                />
              )}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;