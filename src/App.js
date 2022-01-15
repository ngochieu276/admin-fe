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
import Post from "./containers/Post";
import PostDetails from "./containers/Post/PostDetails";
import UserDetails from "./containers/User/UserDetails";
import { Report } from "./containers/Report";
import New from "./containers/New";
import {
  isUserLoggedIn,
  getReports,
  getUsers,
  getTopSales,
  getSalesByDay,
  getPopTags,
  getSalesByMonth,
} from "./actions";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate]);

  useEffect(() => {
    const thisMonth = new Date().getMonth() + 1;

    dispatch(getReports());
    dispatch(getUsers(""));
    dispatch(getTopSales());
    dispatch(getSalesByDay({ month: thisMonth }));
    dispatch(getPopTags({ daysAgo: 7 }));
    dispatch(getSalesByMonth());
  }, []);

  return (
    <div className='App'>
      <Router>
        <Switch>
          <PrivateRoute path='/' exact component={Home} />
          <PrivateRoute path='/product/:productId' component={ProductDetails} />
          <PrivateRoute path='/order/:orderId' component={OrderDetails} />
          <PrivateRoute path='/post/:postId' component={PostDetails} />
          <PrivateRoute path='/user/:userId' component={UserDetails} />
          {auth.user.isMng && <PrivateRoute path='/user' component={User} />}
          <PrivateRoute path='/post' component={Post} />
          <PrivateRoute path='/product' component={Product} />
          <PrivateRoute path='/order' component={Order} />
          <PrivateRoute path='/report' component={Report} />
          <PrivateRoute path='/new' component={New} />
          <Route path='/login' component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
