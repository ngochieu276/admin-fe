import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import User from "./containers/User";
import Home from "./containers/Home";
import Product from "./containers/Product";
import PrivateRoute from "./components/HOC/PrivateRoute";
import Order from "./containers/Order";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import Login from "./containers/Login";
import ProductDetails from "./containers/Product/ProductDetails";
import OrderDetails from "./containers/Order/OrderDetails";

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
          <PrivateRoute path='/order/:orderId' component={OrderDetails} />
          <PrivateRoute path='/user' component={User} />
          <PrivateRoute path='/product' component={Product} />
          <PrivateRoute path='/order' component={Order} />
          <Route path='/login' component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;