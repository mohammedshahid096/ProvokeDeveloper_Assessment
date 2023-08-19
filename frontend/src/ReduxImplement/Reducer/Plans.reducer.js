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

export const AllPlansReducer = (state = { plans: {} }, action) => {
  switch (action.type) {
    case GET_SUB_PLAN_REQUEST:
      return {
        loading: true,
      };
    case GET_SUB_PLAN_SUCCESS:
      return {
        ...state,
        loading: false,
        plans: action.payload,
      };
    case GET_SUB_PLAN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_SUB_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const SubscriptionOperationReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_USER_SUB_PLAN_REQUEST:
    case CANCEL_SUB_REQUEST:
      return {
        loading: true,
      };
    case ADD_USER_SUB_PLAN_SUCCESS:
    case CANCEL_SUB_SUCCESS:
      return {
        loading: false,
        isSuccess: true,
      };
    case ADD_USER_SUB_PLAN_FAIL:
    case CANCEL_SUB_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_SUB_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const UserPlanReducer = (state = { userSubPlan: {} }, action) => {
  switch (action.type) {
    case USER_SUB_PLAN_REQUEST:
      return {
        loading: true,
      };
    case USER_SUB_PLAN_SUCCESS:
      return {
        loading: false,
        userSubPlan: action.payload,
      };
    case USER_SUB_PLAN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_SUB_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
