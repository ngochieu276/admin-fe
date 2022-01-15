import React from "react";
import { Redirect, Route } from "react-router";

const PrivateRoute = ({ component: Component, isMng, ...rest }) => {
  const token = window.localStorage.getItem("token");
  return (
    <Route
      {...rest}
      component={(props) => {
        if (token) {
          return <Component {...props} />;
        } else {
          return <Redirect to={`/login`} />;
        }
      }}
    />
  );
};

export default PrivateRoute;
