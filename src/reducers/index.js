import { combineReducers } from "redux";

import authReducer from "./auth.reducer";
import userReducer from "./user.reducer";
import productReducer from "./product.reducer";
import orderReducer from "./order.reducer";
import postReducer from "./post.reducer";
import reportReducer from "./report.reducer";
import newReducer from "./new.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  product: productReducer,
  order: orderReducer,
  post: postReducer,
  report: reportReducer,
  new: newReducer,
});

export default rootReducer;
