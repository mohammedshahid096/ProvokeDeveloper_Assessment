import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_CLEAR_ERRORS,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
} from "../Constant/user.constant";
import axios from "axios";
import URLConstant from "../Constant/URLConstant";

//?------------------------------------------
// TODO :  Login Action
//?------------------------------------------
export const LoginAction = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `${URLConstant}/user/login`,
      { email, password },
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};
//?------------------------------------------
// TODO : Register the User
//?------------------------------------------
export const SignupAction = (Data) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `${URLConstant}/user/register`,
      Data,
      config
    );

    dispatch({
      type: REGISTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//?------------------------------------------
// TODO : Logout Action
//?------------------------------------------
export const LogoutAction = () => async (dispatch) => {
  try {
    await axios.get(`${URLConstant}/user/logout`);
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//?------------------------------------------
// TODO : Load user
//?------------------------------------------
export const LoadUserAction = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${URLConstant}/user/me`);
    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL });
  }
};

//?------------------------------------------
// TODO : For clear all User the errors
//?------------------------------------------
export const userClearErrorsAction = () => async (dispatch) => {
  dispatch({ type: USER_CLEAR_ERRORS });
};
