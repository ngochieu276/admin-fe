import { productConstants } from "../actions/constant";

const initialState = {
  products: [],
  loading: false,
  selectedProduct: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case productConstants.GET_PRODUCT_SUCCESS:
      state = {
        ...state,
        products: action.payload.products,
      };
      break;
    case productConstants.GET_PRODUCT_BY_ID_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productConstants.GET_PRODUCT_BY_ID_SUCCESS:
      state = {
        ...state,
        loading: false,
        selectedProduct: action.payload.product,
      };
      break;
    case productConstants.GET_PRODUCT_BY_ID_FAILURE:
      state = {
        ...state,
        loading: false,
        products: action.payload.error,
      };
      break;
  }
  return state;
};
