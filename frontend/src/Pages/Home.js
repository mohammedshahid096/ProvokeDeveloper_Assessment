import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, CircularProgress, Typography } from "@mui/material";
import "../Styles/Home.scss";
import {
  CancelSubscriptionAction,
  GetUserSubscriptionAction,
} from "../ReduxImplement/Action/plans.action";
import Navbar from "../Components/Navbar";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.User);
  const { loading, userSubPlan } = useSelector((state) => state.UserSubPlan);
  const { loading: l1 } = useSelector((state) => state.SubPlanOperation);

  const cancelSubcriptionFunction = () => {
    dispatch(CancelSubscriptionAction());
    dispatch(GetUserSubscriptionAction());
  };

  useEffect(() => {
    if (user.isSubscibe === false) {
      navigate("/plans");
    }
  }, [navigate, user]);

  useEffect(() => {
    dispatch(GetUserSubscriptionAction());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="bgWrapper">
        {!loading || l1 ? (
          userSubPlan && (
            <div className="homeContainer">
              <div>
                <Typography variant="h5" fontWeight={600} component="h1">
                  Current Plan Details
                  {userSubPlan.subscriptionCanceled ? (
                    <small className="cancelsmall">Cancelled</small>
                  ) : (
                    <small className="activesmall">Active</small>
                  )}
                </Typography>
                {userSubPlan.subscriptionCanceled ? null : (
                  <Button onClick={cancelSubcriptionFunction}>Cancel</Button>
                )}
              </div>
              <div>
                <Typography component="h3">{userSubPlan.device}</Typography>
                <small>
                  {userSubPlan.useDevices && userSubPlan.useDevices.join("+")}
                </small>
              </div>

              <Typography variant="h4" fontWeight={600} mt={1} component="h1">
                ₹ {userSubPlan.Payment}/
                {userSubPlan.BillingCycle === "Monthly" ? "mo" : "yr"}
              </Typography>
              <br />
              <Button variant="outlined" color="primary">
                Change Plan
              </Button>

              <p>
                Your subcription has started on 11th, 2022 and will auto renew
                on jul 12th 2023
              </p>
            </div>
          )
        ) : (
          <CircularProgress color="warning" />
        )}
      </div>
    </>
  );
};

export default Home;
