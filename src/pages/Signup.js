import {
  Typography,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import React, { useState, useContext, useEffect } from "react";
import InfoContext from "../context/InfoContext";
import { Redirect } from "react-router-dom";
import TextInput from "../components/TextInput";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import ActionButton from "../components/ActionButton";
import axios from "axios";

function SignUp() {
  const [TCode, changeTCode] = useState("");
  const [TName, changeTName] = useState("");
  const [LPass, changeLPass] = useState("");
  const [SPass, changeSPass] = useState("");
  const [Message, setMessage] = useState("");
  const [redirect, setRedirect] = useState(false);

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const { isLoggedIn } = useContext(
    InfoContext
  );

  const [isLoading, setLoading] = useState(false);
  const backend = process.env.REACT_APP_BACKEND_URL

  const handleTNameChange = (event) => {
    changeTName(event.target.value);
  };

  const handleTCodeChange = (event) => {
    changeTCode(event.target.value);
  };

  const handleLPassChange = (event) => {
    changeLPass(event.target.value);
  };

  const handleSPassChange = (event) => {
    changeSPass(event.target.value);
  };

  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };


  const keyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setMessage("");
    const url = `${backend}/team/reg`;
    setLoading(true);
    const data = {
      name: TName,
      code: TCode,
      adminPass: LPass,
      specPass: SPass,
    };
    console.log(url, data);
    try {
      await axios.post(url, data)
        .then((res) => {
          console.log(res);
          console.log(res.status);
          setMessage(res.data.message);
        });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    let isAdmin = localStorage.getItem("userType");
    if (isAdmin !== "A") {
      setRedirect(true);
    }
  }, [isLoggedIn]);

  if (redirect) {
    return <Redirect to="/" />
  }

  return (
    <div className="page-container">
      <div className="inner-data">
        <Typography variant="h3" color="primary" className="login-head">
          Signup
          </Typography>
        <form className="form">
          <TextInput
            id="TName"
            label="Team Name"
            type="text"
            className="form-input"
            variant="outlined"
            value={TName}
            onChange={handleTNameChange}
          ></TextInput>
          <br />
          <TextInput
            id="TCode"
            label="Team Code"
            type="text"
            className="form-input"
            variant="outlined"
            value={TCode}
            onChange={handleTCodeChange}
          ></TextInput>
          <br />
          <TextInput
            id="LPass"
            label="Leader Password"
            type={showPassword1 ? "text" : "password"}
            className="form-input"
            variant="outlined"
            value={LPass}
            onChange={handleLPassChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="show password"
                    onClick={togglePasswordVisibility1}
                    edge="end"
                    className="view-pass-icon"
                  >
                    {showPassword1 ? (
                      <Visibility />
                    ) : (
                        <VisibilityOff />
                      )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          >
          </TextInput>
          <br />
          <TextInput
            id="SPass"
            type={showPassword2 ? "text" : "password"}
            label="Spectator Password"
            className="form-input"
            variant="outlined"
            value={SPass}
            onChange={handleSPassChange}
            onKeyPress={keyPress}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="show password"
                    onClick={togglePasswordVisibility2}
                    edge="end"
                    className="view-pass-icon"
                  >
                    {showPassword2 ? (
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
        <h5>{Message}</h5>
        <br />
        <div className="login-btn-div">
          <ActionButton
            className="login-btn"
            onClick={handleSubmit}
            disabled={isLoading ? true : false}
            children={!isLoading ? (
              "signup"
            ) : (
                <CircularProgress
                  color="secondary"
                  size={20}
                  thickness={5}
                />
              )} />
        </div>
      </div>
    </div>
  );
}

export default SignUp;