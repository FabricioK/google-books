import { combineReducers } from "redux";
import { LOGOUT_USUARIO } from "../actions/AuthActions";
import AuthReducer from "./AuthReducer";
import BooksReducer from "./BooksReducer";


const appReducer = combineReducers({
  auth: AuthReducer,
  books: BooksReducer
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_USUARIO) {
    state = undefined;
  }
  
  return appReducer(state, action);
};

export default rootReducer;
