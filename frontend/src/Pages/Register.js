import React, { useEffect, useState } from "react";
import { Typography, TextField, Button, CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/login.scss";
import { ToastError } from "../Components/AlertPops/AlertPop";
import { useDispatch, useSelector } from "react-redux";
import {
  SignupAction,
  userClearErrorsAction,
} from "../ReduxImplement/Action/user.action";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.User
  );

  const [userDetails, setuserDetails] = useState({
    username: "",
    useremail: "",
    userpassword: "",
  });

  const setOnChangeHandler = (e) => {
    setuserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const submitHandlerButton = (e) => {
    e.preventDefault();
    if (
      userDetails.username === "" ||
      userDetails.useremail === "" ||
      userDetails.userpassword === ""
    ) {
      ToastError("Enter the Fields");
      return;
    } else {
      const formData = new FormData();
      formData.append("name", userDetails.username);
      formData.append("email", userDetails.useremail);
      formData.append("password", userDetails.userpassword);

      dispatch(SignupAction(formData));
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      ToastError(error);
      dispatch(userClearErrorsAction());
    }
  }, [dispatch, navigate, isAuthenticated, error]);
  return (
    <div className="bgWrapper">
      <div className="bgWhiteBox loginWrapper">
        <Typography variant="h4" component="h2">
          Create Account
        </Typography>

        <form onSubmit={submitHandlerButton}>
          <div className="inputLabelClass">
            <Typography variant="h6">Name</Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              placeholder="Enter the name"
              name="username"
              onChange={setOnChangeHandler}
            />
          </div>

          <div className="inputLabelClass">
            <Typography variant="h6">Email</Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              placeholder="Enter the email"
              type="email"
              name="useremail"
              onChange={setOnChangeHandler}
            />
          </div>

          <div className="inputLabelClass">
            <Typography variant="h6">Password</Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              placeholder="Enter the password"
              name="userpassword"
              onChange={setOnChangeHandler}
            />
          </div>

          <div className="rememberDiv">
            <input type="checkbox" /> <span>Remember Me</span>
          </div>

          <div className="bgButtonBlue">
            {loading ? (
              <CircularProgress color="success" />
            ) : (
              <Button
                variant="contained"
                fullWidth
                className="bgButtonBlue"
                type="submit"
              >
                Sign Up
              </Button>
            )}
          </div>
        </form>

        {loading ? null : (
          <div className="AlreadyPresent">
            <Typography>
              Already have an account? <Link to="/login">Login</Link>{" "}
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
