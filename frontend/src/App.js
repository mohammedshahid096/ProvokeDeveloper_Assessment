import { useEffect } from "react";
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import webfont from "webfontloader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import SubscriptionPlans from "./Pages/SubscriptionPlans";
import Home from "./Pages/Home";
import PublicRoute from "./Routes/PublicRoute";
import ProtectedRoute from "./Routes/ProtectedRoute";
import { LoadUserAction } from "./ReduxImplement/Action/user.action";
import Payment from "./Pages/Payment";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    webfont.load({
      google: {
        families: ["Roboto", "Poppins"],
      },
    });
    dispatch(LoadUserAction());
  });
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/plans"
            element={
              <ProtectedRoute>
                <SubscriptionPlans />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>

      <ToastContainer />
    </div>
  );
}

export default App;
