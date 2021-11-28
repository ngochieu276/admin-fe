import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import User from "./containers/User";
import Home from "./containers/Home";
import Product from "./containers/Product";
import PrivateRoute from "./components/HOC/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import Login from "./containers/Login";
import ProductDetails from "./containers/Product/ProductDetails/ProductDetails";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    // if (!auth.authenticate) {
    //   dispatch(isUserLoggedIn());
    // }
    // if (auth.authenticate) {
    //   dispatch(getInitialData());
    // }
  }, []);

  return (
    <div className='App'>
      <Router>
        <Switch>
          <PrivateRoute path='/' exact component={Home} />
          <PrivateRoute path='/product/:productId' component={ProductDetails} />
          <PrivateRoute path='/user' component={User} />
          <PrivateRoute path='/product' component={Product} />
          <Route path='/login' component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
