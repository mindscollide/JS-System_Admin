import { applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
// import { authReducer, systemReducer, securityReducer } from "./reducers";

import { configureStore } from "@reduxjs/toolkit";
import * as actions from "./action_types";
import {
  authReducer,
  systemReducer,
  securityReducer,
  downloadReducer,
  uploadReducer,
  AddCategory,
  UpdateCategoryMap,
} from "./reducers";

const AppReducer = combineReducers({
  auth: authReducer,
  systemReducer: systemReducer,
  securityReducer: securityReducer,
  downloadReducer: downloadReducer,
  uploadReducer: uploadReducer,
  AddCategory: AddCategory,
  UpdateCategoryMap: UpdateCategoryMap,
});

const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === actions.SIGN_OUT) {
    state = undefined;
  }
  return AppReducer(state, action);
};

const store = configureStore(
  { reducer: rootReducer },
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
