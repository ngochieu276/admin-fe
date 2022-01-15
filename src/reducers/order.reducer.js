import { orderConstants } from "../actions/constant";

const initState = {
  orders: [],
  selectedOrder: {},
  loading: true,
  error: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case orderConstants.GET_CUSTOMER_ORDER_REQUEST:
      state = { ...state, loading: true };
      break;
    case orderConstants.GET_CUSTOMER_ORDER_SUCCESS:
      state = { ...state, loading: false, orders: action.payload.orders };
      break;
    case orderConstants.GET_CUSTOMER_ORDER_FAILURE:
      state = { ...state, loading: false, error: action.payload.error };
      break;

    // ///

    case orderConstants.GET_CARED_ORDERS_REQUEST:
      state = { ...state, loading: true };
      break;
    case orderConstants.GET_CARED_ORDERS_SUCCESS:
      state = { ...state, loading: false, orders: action.payload.orders };
      break;
    case orderConstants.GET_CARED_ORDERS_FAILURE:
      state = { ...state, loading: false, error: action.payload.error };
      break;

    // //

    case orderConstants.GET_UNCARED_ORDERS_REQUEST:
      state = { ...state, loading: true };
      break;
    case orderConstants.GET_UNCARED_ORDERS_SUCCESS:
      state = { ...state, loading: false, orders: action.payload.orders };
      break;
    case orderConstants.GET_UNCARED_ORDERS_FAILURE:
      state = { ...state, loading: false, error: action.payload.error };
      break;

    // //

    case orderConstants.MANAGER_SEARCH_ORDER_REQUEST:
      state = { ...state, loading: true };
      break;
    case orderConstants.MANAGER_SEARCH_ORDER_SUCCESS:
      state = { ...state, loading: false, orders: action.payload.orders };
      break;
    case orderConstants.MANAGER_SEARCH_ORDER_FAILURE:
      state = { ...state, loading: false, error: action.payload.error };
      break;

    // //

    case orderConstants.GET_CUSTOM_ORDER_BY_ID_REQUEST:
      state = { ...state, loading: true };
      break;

    case orderConstants.GET_CUSTOM_ORDER_BY_ID_SUCCESS:
      state = { ...state, loading: false, selectedOrder: action.payload.order };
      break;

    case orderConstants.GET_CUSTOM_ORDER_BY_ID_FAILURE:
      state = { ...state, loading: false, error: action.payload.error };
      break;

    // ////

    case orderConstants.GET_CUSTOMER_ORDER_BYEMAIL_REQUEST:
      state = { ...state, error: null, loading: true };
      break;

    case orderConstants.GET_CUSTOMER_ORDER_BYEMAIL_SUCCESS:
      state = {
        ...state,
        loading: false,
        error: null,
        orders: action.payload.orders,
      };
      break;

    case orderConstants.GET_CUSTOMER_ORDER_BYEMAIL_FAILURE:
      state = {
        ...state,
        orders: [],
        loading: false,
        error: action.payload.error,
      };
      break;

    // ///

    case orderConstants.SORT_ORDER_REQUEST:
      state = { ...state, loading: true };
      break;

    case orderConstants.SORT_ORDER_SUCCESS:
      state = { ...state, loading: false, orders: action.payload.orders };
      break;

    case orderConstants.SORT_ORDER_FAILURE:
      state = { ...state, loading: false, error: action.payload.error };
      break;
  }

  return state;
};
