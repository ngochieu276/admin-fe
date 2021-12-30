import { reportConstant } from "../actions/constant";

const initialState = {
  reports: [],
  loading: true,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case reportConstant.GET_REPORT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case reportConstant.GET_REPORT_SUCCESS:
      state = {
        ...state,
        reports: action.payload.reports,
        loading: false,
      };
      break;
    case reportConstant.GET_REPORT_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;

    case reportConstant.GET_ADVANGE_REPORTS_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case reportConstant.GET_ADVANGE_REPORTS_SUCCESS:
      state = {
        ...state,
        reports: action.payload.reports,
        loading: false,
      };
      break;
    case reportConstant.GET_ADVANGE_REPORTS_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;

    case reportConstant.UPDATE_CHECK_REPORT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case reportConstant.UPDATE_CHECK_REPORT_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case reportConstant.UPDATE_CHECK_REPORT_FAILURE:
      state = {
        ...state,
        loading: false,
      };
      break;
  }
  return state;
};
