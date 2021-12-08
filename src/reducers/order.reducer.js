import { orderConstants } from "../actions/constant";

const initState = {
  orders: [],
  selectedOrder: {},
  loading: false,
  error: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case orderConstants.GET_CUSTOMER_ORDER_SUCCESS:
      state = { ...state, orders: action.payload.orders };
      break;
  }
  switch (action.type) {
    case orderConstants.GET_CUSTOM_ORDER_BY_ID_REQUEST:
      state = { ...state, loading: true };
      break;
  }
  switch (action.type) {
    case orderConstants.GET_CUSTOM_ORDER_BY_ID_SUCCESS:
      state = { ...state, loading: false, selectedOrder: action.payload.order };
      break;
  }
  switch (action.type) {
    case orderConstants.GET_CUSTOM_ORDER_BY_ID_FAILURE:
      state = { ...state, loading: false, error: action.payload.error };
      break;
  }
  return state;
};
