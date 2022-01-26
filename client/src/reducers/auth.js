import {
    AUTH_ERROR,
    LOGOUT,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED,
} from "../actions/types";
import setAuthToken from "../utils/setAuthToken";

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
};

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload,
            };
        case REGISTER_SUCCESS:
            localStorage.setItem("token", payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
            };
        case AUTH_ERROR:
        case REGISTER_FAIL:
        case LOGOUT:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
            };
        default:
            return state;
    }
}
