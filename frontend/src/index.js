import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import App from "./App.js";
import "react-toastify/dist/ReactToastify.css";

import Login from "./screens/Login";
import Register from "./screens/Register";
import Activate from "./screens/Activate";
import ForgetPassword from "./screens/ForgotPassword";
import ResetPassword from "./screens/ResetPassword";
import Private from "./screens/Private";
import Admin from "./screens/Admin";

import PrivateRoute from "./Routes/PrivateRoute";
import AdminRoute from "./Routes/AdminRoute";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact render={(props) => <App {...props} />} />
      <Route path="/login" exact render={(props) => <Login {...props} />} />
      <Route
        path="/register"
        exact
        render={(props) => <Register {...props} />}
      />
      <Route
        path="/users/activate/:token"
        exact
        render={(props) => <Activate {...props} />}
      />
      <Route
        path="/users/password/forget"
        exact
        render={(props) => <ForgetPassword {...props} />}
      />
      <Route
        path="/users/password/reset/:token"
        exact
        render={(props) => <ResetPassword {...props} />}
      />
      <PrivateRoute path="/private" exact component={Private} />
      <AdminRoute path="/path" exact component={Admin} />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
