import { summaryConstant } from "../actions/constant";

const initialState = {
  topSales: null,
  salesByDay: null,
  salesByMonth: null,
  popTags: null,
  usersBuyList: null,
  rebuyList: null,
  loadTopSales: true,
  loadSalesByDay: true,
  loadPopTags: true,
  loadSalesByMonth: true,
  loadUserBuyList: true,
  loadRebuyList: true,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case summaryConstant.GET_TOP_SALES_REQUEST:
      state = {
        ...state,
        loadTopSales: true,
      };
      break;
    case summaryConstant.GET_TOP_SALES_SUCCESS:
      state = {
        ...state,
        loadTopSales: false,
        topSales: action.payload.topSales,
      };
      break;
    case summaryConstant.GET_TOP_SALES_FAILURE:
      state = {
        ...state,
        loadTopSales: false,
        error: action.payload.error,
      };
      break;

    //

    case summaryConstant.GET_SALES_BY_DAY_REQUEST:
      state = {
        ...state,
        loadSalesByDay: true,
      };
      break;
    case summaryConstant.GET_SALES_BY_DAY_SUCCESS:
      state = {
        ...state,
        loadSalesByDay: false,
        salesByDay: action.payload.salesByDay,
      };
      break;
    case summaryConstant.GET_SALES_BY_DAY_FAILURE:
      state = {
        ...state,
        loadSalesByDay: false,
        error: action.payload.error,
      };
      break;

    //

    case summaryConstant.GET_SALES_BY_MONTH_REQUEST:
      state = {
        ...state,
        loadSalesByMonth: true,
      };
      break;
    case summaryConstant.GET_SALES_BY_MONTH_SUCCESS:
      state = {
        ...state,
        loadSalesByMonth: false,
        salesByMonth: action.payload.salesByMonth,
      };
      break;
    case summaryConstant.GET_SALES_BY_MONTH_FAILURE:
      state = {
        ...state,
        loadSalesByMonth: false,
        salesByMonth: action.payload.salesByMonth,
      };
      break;

    //

    case summaryConstant.GET_POP_TAGS_REQUEST:
      state = {
        ...state,
        loadPopTags: true,
      };
      break;
    case summaryConstant.GET_POP_TAGS_SUCCESS:
      state = {
        ...state,
        loadPopTags: false,
        popTags: action.payload.popTags,
      };
      break;
    case summaryConstant.GET_POP_TAGS_FAILURE:
      state = {
        ...state,
        loadPopTags: false,
        error: action.payload.error,
      };
      break;

    //

    case summaryConstant.GET_USER_BUY_REQUEST:
      state = {
        ...state,
        loadPopTags: true,
      };
      break;
    case summaryConstant.GET_USER_BUY_SUCCESS:
      state = {
        ...state,
        loadUserBuyList: false,
        usersBuyList: action.payload.usersBuyList,
      };
      break;
    case summaryConstant.GET_USER_BUY_FAILURE:
      state = {
        ...state,
        loadUserBuyList: false,
        error: action.payload.error,
      };
      break;

    //

    case summaryConstant.GET_REBUY_REQUEST:
      state = {
        ...state,
        loadRebuyList: true,
      };
      break;
    case summaryConstant.GET_REBUY_SUCCESS:
      state = {
        ...state,
        loadRebuyList: false,
        rebuyList: action.payload.rebuyList,
      };
      break;
    case summaryConstant.GET_REBUY_FAILURE:
      state = {
        ...state,
        loadRebuyList: false,
        error: action.payload.error,
      };
      break;
  }
  return state;
};
