import { productConstants } from "../actions/constant";

const initialState = {
  products: [],
  loading: true,
  loadingSpec: true,
  selectedProduct: {},
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case productConstants.GET_PRODUCT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productConstants.GET_PRODUCT_SUCCESS:
      state = {
        ...state,
        products: action.payload.products,
        selectedProduct: null,

        loadingSpec: true,
        loading: false,
      };
      break;
    case productConstants.GET_PRODUCT_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;

    case productConstants.UPDATE_PRODUCT_REQUEST:
      state = {
        ...state,
        error: null,
        loadingSpec: true,
        loading: true,
      };
      break;
    case productConstants.UPDATE_PRODUCT_SUCCESS:
      state = {
        ...state,
        loadingSpec: false,
        loading: false,
      };
      break;
    case productConstants.UPDATE_PRODUCT_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loadingSpec: false,
      };
      break;

    case productConstants.GET_PRODUCT_BY_ID_REQUEST:
      state = {
        ...state,
        loadingSpec: true,
      };
      break;
    case productConstants.GET_PRODUCT_BY_ID_SUCCESS:
      state = {
        ...state,
        selectedProduct: action.payload.product,
        loadingSpec: false,
      };
      break;
    case productConstants.GET_PRODUCT_BY_ID_FAILURE:
      state = {
        ...state,
        products: action.payload.error,
        loadingSpec: false,
      };
      break;

    case productConstants.GET_INSLIDER_PRODUCTS_SUCCESS:
      state = {
        ...state,
        products: action.payload.products,
      };
      break;
    case productConstants.GET_ISHOT_PRODUCTS_SUCCESS:
      state = {
        ...state,
        products: action.payload.products,
      };
      break;

    case productConstants.DELETE_PRODUCT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productConstants.DELETE_PRODUCT_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case productConstants.DELETE_PRODUCT_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
  }
  return state;
};
