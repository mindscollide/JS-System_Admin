import * as actions from "../action_types";

const initialState = {
  Loading: false,
  Spinner: false,
  ResponseMessage: "",
  allCorporateUser: [],
  searchCorporate: [],
  bankCorporates: [],
  corporateNameByBankId: [],
  counterCorporateLimit: "",
  updateCorporateResponse: [],
  saveValidCorporates: [],
  volGetMetersBankId: [],
  updateVolMeter: [],
};

const systemReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_ALL_CORPORATE_USER_INIT:
      return {
        ...state,
        Loading: true,
        Spinner: true,
      };

    case actions.GET_ALL_CORPORATE_USER_SUCCESS:
      return {
        ...state,
        Loading: false,
        Spinner: false,
        allCorporateUser: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_CORPORATE_USER_FAIL:
      return {
        ...state,
        Loading: false,
        Spinner: false,
        allCorporateUser: [],
        ResponseMessage: action.message,
      };

    case actions.SEARCH_CORPORATE_USER_INIT:
      return {
        ...state,
        Loading: true,
        Spinner: true,
      };

    case actions.SEARCH_CORPORATE_USER_SUCCESS:
      return {
        ...state,
        Loading: false,
        Spinner: false,
        searchCorporate: action.response,
        ResponseMessage: action.message,
      };

    case actions.SEARCH_CORPORATE_USER_FAIL:
      return {
        ...state,
        Loading: false,
        Spinner: false,
        searchCorporate: [],
        ResponseMessage: action.message,
      };

    case actions.UPDATE_CORPORATE_USER_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.UPDATE_CORPORATE_USER_SUCCESS:
      return {
        ...state,
        Loading: false,
        updateCorporateResponse: action.response,
        ResponseMessage: action.message,
      };

    case actions.UPDATE_CORPORATE_USER_FAIL:
      return {
        ...state,
        Loading: false,
        updateCorporateResponse: "",
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_BANK_CORPORATE_INIT:
      return {
        ...state,
        Loading: true,
        Spinner: true,
      };

    case actions.GET_ALL_BANK_CORPORATE_SUCCESS:
      return {
        ...state,
        Loading: false,
        Spinner: false,
        bankCorporates: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_BANK_CORPORATE_FAIL:
      return {
        ...state,
        Loading: false,
        Spinner: false,
        bankCorporates: [],
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_CORPORATE_NAME_BY_BANK_INIT:
      return {
        ...state,
        Loading: true,
        Spinner: true,
      };

    case actions.GET_ALL_CORPORATE_NAME_BY_BANK_SUCCESS:
      return {
        ...state,
        Loading: false,
        Spinner: false,
        corporateNameByBankId: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_CORPORATE_NAME_BY_BANK_FAIL:
      return {
        ...state,
        Loading: false,
        Spinner: false,
        corporateNameByBankId: [],
        ResponseMessage: action.message,
      };

    case actions.GET_COUNTER_PARTY_LIMIT_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.GET_COUNTER_PARTY_LIMIT_SUCCESS:
      return {
        ...state,
        Loading: false,
        counterCorporateLimit: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_COUNTER_PARTY_LIMIT_FAIL:
      return {
        ...state,
        Loading: false,
        counterCorporateLimit: "",
        ResponseMessage: action.message,
      };

    case actions.SAVE_COUNTER_PARTY_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.SAVE_COUNTER_PARTY_SUCCESS:
      return {
        ...state,
        Loading: false,
        saveValidCorporates: action.response,
        ResponseMessage: action.message,
      };

    case actions.SAVE_COUNTER_PARTY_FAIL:
      return {
        ...state,
        Loading: false,
        saveValidCorporates: [],
        ResponseMessage: action.message,
      };

    case actions.GET_VOL_METER_BANK_ID_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.GET_VOL_METER_BANK_ID_SUCCESS:
      return {
        ...state,
        Loading: false,
        volGetMetersBankId: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_VOL_METER_BANK_ID_FAIL:
      return {
        ...state,
        Loading: false,
        volGetMetersBankId: [],
        ResponseMessage: action.message,
      };

    case actions.ADD_UPDATE_VOL_METER_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.ADD_UPDATE_VOL_METER_SUCCESS:
      return {
        ...state,
        Loading: false,
        updateVolMeter: action.response,
        ResponseMessage: action.message,
      };

    case actions.ADD_UPDATE_VOL_METER_FAIL:
      return {
        ...state,
        Loading: false,
        updateVolMeter: [],
        ResponseMessage: action.message,
      };

    default:
      return { ...state };
  }
};

export default systemReducer;
