import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, CircularProgress, Typography } from "@mui/material";
import "../Styles/plans.scss";
import Navbar from "../Components/Navbar";
import { AllPlansAction } from "../ReduxImplement/Action/plans.action";
import { ToastError } from "../Components/AlertPops/AlertPop";
import { useNavigate } from "react-router-dom";

const MultiPlans = (props) => {
  const { data, choosePlan, setchoosePlan, setchoosePlanData } = props;

  const selectOption = (i, data) => {
    setchoosePlan(i);
    setchoosePlanData(data);
  };

  return (
    <>
      {data &&
        data.map((item, index) => (
          <div
            className={
              choosePlan === index ? "planResult planResultActiv" : "planResult"
            }
            key={index}
          >
            <div className="col1" onClick={() => selectOption(index, item)}>
              <div>{item.device}</div>
              {choosePlan === index ? <span></span> : null}
            </div>

            <div className="col2">{item.Price}</div>

            <div className="col2">{item.videoQuality}</div>

            <div className="col2">{item.resolution}</div>
            <div className="col2 devicesCol" style={{ border: "none" }}>
              {item.useDevices.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>
          </div>
        ))}
    </>
  );
};

const SubscriptionPlans = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, plans } = useSelector((state) => state.AllPlans);
  const [selectPlan, setselectPlan] = useState(true);
  const [choosePlan, setchoosePlan] = useState(0);
  const [choosePlanData, setchoosePlanData] = useState({});
  useEffect(() => {
    dispatch(AllPlansAction());
  }, [dispatch]);

  const onSubmitButtonPlan = () => {
    let x;
    if (!choosePlanData.device) {
      x = selectPlan ? plans.monthly[0] : plans.yearly[0];
    } else {
      x = choosePlanData;
    }
    selectPlan ? (x.BillingCycle = "Monthly") : (x.BillingCycle = "Yearly");
    sessionStorage.setItem("SubscriptionDetail", JSON.stringify(x));
    navigate("/payment");
  };

  const monthlyOrYearly = (v) => {
    setchoosePlanData({});
    setchoosePlan(0);
    setselectPlan(v);
  };

  useEffect(() => {
    if (error) {
      ToastError(error);
    }
  }, [dispatch, error]);
  return (
    <>
      <Navbar />
      <div className="bgWrapper plansWrapper">
        {loading ? (
          <CircularProgress />
        ) : (
          <div className="planContainer">
            <Typography variant="h5" component="h1">
              Choose the right plan for you
            </Typography>

            <div className="planRow">
              <div className="planHeading">
                <div className="col1">
                  <div>
                    <span
                      className={selectPlan ? "planActive" : ""}
                      onClick={() => monthlyOrYearly(true)}
                    >
                      Monthly
                    </span>
                    <span
                      className={selectPlan ? "" : "planActive"}
                      onClick={() => monthlyOrYearly(false)}
                    >
                      Yearly
                    </span>
                  </div>
                </div>

                <div className="col2">Monthly Price</div>

                <div className="col2">Video Quality</div>

                <div className="col2">Resolution</div>
                <div className="col2 " style={{ border: "none" }}>
                  Devices you can use to watch
                </div>
              </div>

              {selectPlan ? (
                <MultiPlans
                  data={plans.monthly}
                  setchoosePlan={setchoosePlan}
                  choosePlan={choosePlan}
                  setchoosePlanData={setchoosePlanData}
                />
              ) : (
                <MultiPlans
                  data={plans.yearly}
                  setchoosePlan={setchoosePlan}
                  choosePlan={choosePlan}
                  setchoosePlanData={setchoosePlanData}
                />
              )}
            </div>

            <div className="selectplanButton">
              <Button
                variant="contained"
                fullWidth
                onClick={onSubmitButtonPlan}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SubscriptionPlans;
