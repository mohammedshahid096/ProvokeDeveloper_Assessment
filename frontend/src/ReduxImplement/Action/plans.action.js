import axios from "axios";
import URLConstant from "../Constant/URLConstant";
import {
  ADD_USER_SUB_PLAN_FAIL,
  ADD_USER_SUB_PLAN_REQUEST,
  ADD_USER_SUB_PLAN_SUCCESS,
  CANCEL_SUB_FAIL,
  CANCEL_SUB_REQUEST,
  CANCEL_SUB_SUCCESS,
  CLEAR_SUB_ERRORS,
  GET_SUB_PLAN_FAIL,
  GET_SUB_PLAN_REQUEST,
  GET_SUB_PLAN_SUCCESS,
  USER_SUB_PLAN_FAIL,
  USER_SUB_PLAN_REQUEST,
  USER_SUB_PLAN_SUCCESS,
} from "../Constant/plans.constant";

//?------------------------------------------
// TODO : All Subscription plan will be fetch
//?------------------------------------------
export const AllPlansAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SUB_PLAN_REQUEST });
    const { data } = await axios.get(`${URLConstant}/plans/`);

    dispatch({
      type: GET_SUB_PLAN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SUB_PLAN_FAIL,
      payload: error.response.data.message,
    });
  }
};

//?------------------------------------------
// TODO : add subscription plan to database
//?------------------------------------------
export const AddSubscriptionAction = (Plan) => async (dispatch) => {
  try {
    dispatch({ type: ADD_USER_SUB_PLAN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(`${URLConstant}/plans/add`, Plan, config);

    dispatch({
      type: ADD_USER_SUB_PLAN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_USER_SUB_PLAN_FAIL,
      payload: error.response.data.message,
    });
  }
};

//?------------------------------------------
// TODO : get subscription plan
//?------------------------------------------
export const GetUserSubscriptionAction = (Plan) => async (dispatch) => {
  try {
    dispatch({ type: USER_SUB_PLAN_REQUEST });

    const { data } = await axios.get(`${URLConstant}/plans/myplans`);

    dispatch({
      type: USER_SUB_PLAN_SUCCESS,
      payload: data.userPlan,
    });
  } catch (error) {
    dispatch({
      type: USER_SUB_PLAN_FAIL,
      payload: error.response.data.message,
    });
  }
};

//?------------------------------------------
// TODO : cancel subscription plan
//?------------------------------------------
export const CancelSubscriptionAction = () => async (dispatch) => {
  try {
    dispatch({ type: CANCEL_SUB_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(`${URLConstant}/plans/cancel`, config);

    dispatch({
      type: CANCEL_SUB_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: CANCEL_SUB_FAIL,
      payload: error.response.data.message,
    });
  }
};

//?------------------------------------------
// TODO : For clear all subscription errors
//?------------------------------------------
export const subscriptionClearErrorsAction = () => async (dispatch) => {
  dispatch({ type: CLEAR_SUB_ERRORS });
};
