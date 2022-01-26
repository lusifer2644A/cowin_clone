import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import temp from "./temp";
import members from "./member";

export default combineReducers({ alert, auth, temp, members });
