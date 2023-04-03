// import { createStore } from "redux";
import { legacy_createStore as createStore } from "redux";

const initialState = {
  showDashboard: false,
};

const reducer = (state = initialState, action) => {
  return state;
};

const store = createStore(reducer);

export default store;
