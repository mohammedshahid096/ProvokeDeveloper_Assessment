import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { UserReducer } from "./ReduxImplement/Reducer/user.reducer";
import GetCookie from "./Routes/Cookie";
import {
  AllPlansReducer,
  SubscriptionOperationReducer,
  UserPlanReducer,
} from "./ReduxImplement/Reducer/Plans.reducer";

const Reducer = combineReducers({
  User: UserReducer,
  AllPlans: AllPlansReducer,
  SubPlanOperation: SubscriptionOperationReducer,
  UserSubPlan: UserPlanReducer,
});

const initialState = {
  User: {
    token: GetCookie() ? GetCookie() : null,
  },
};

const middleware = [thunk];

const StoreDB = createStore(
  Reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default StoreDB;
