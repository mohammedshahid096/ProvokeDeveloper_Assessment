import React, { useEffect } from "react";
import "../Styles/payment.scss";
import {
  Typography,
  TextField,
  InputAdornment,
  Button,
  CircularProgress,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoadUserAction } from "../ReduxImplement/Action/user.action";
import {
  AddSubscriptionAction,
  subscriptionClearErrorsAction,
} from "../ReduxImplement/Action/plans.action";
import { ToastError } from "../Components/AlertPops/AlertPop";

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, isSuccess, error } = useSelector(
    (state) => state.SubPlanOperation
  );
  const {
    user: { isSubscibe },
  } = useSelector((state) => state.User);
  const paymentDetails = JSON.parse(
    sessionStorage.getItem("SubscriptionDetail")
  );

  if (!paymentDetails) {
    navigate("/plans");
  }

  const MakePaymentFunction = () => {
    dispatch(AddSubscriptionAction(paymentDetails));
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(LoadUserAction());
    }
    if (error) {
      ToastError(error);
      dispatch(subscriptionClearErrorsAction());
    }
    if (isSubscibe) {
      navigate("/");
    }
  }, [navigate, dispatch, isSuccess, error, isSubscibe]);
  return (
    <div className="bgWrapper">
      <div className="paymentContainer">
        <div className="paymentProcess">
          <Typography variant="h5" component="h1">
            Complete Payment
          </Typography>
          <Typography>Enter your credit or debit card details below</Typography>

          <div>
            <TextField
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CreditCardIcon />
                  </InputAdornment>
                ),
              }}
              placeholder="Card number"
              size="small"
              fullWidth
              type="number"
            />
            {loading ? (
              <CircularProgress style={{ marginTop: "1.5rem" }} />
            ) : (
              <Button onClick={MakePaymentFunction}>Confirm Payment</Button>
            )}
          </div>
        </div>

        <div className="orderSummary">
          <Typography variant="h6" component="h2">
            Order Summary
          </Typography>

          <div>
            <p>Plan Name</p>
            <b>{paymentDetails.device}</b>
          </div>

          <div>
            <p>Billing Cycle</p>
            <b>{paymentDetails.BillingCycle}</b>
          </div>

          <div>
            <p>Plan Price</p>
            <b>
              ₹ {paymentDetails.Price}/{" "}
              {paymentDetails.BillingCycle === "Monthly" ? "mo" : "yr"}
            </b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
