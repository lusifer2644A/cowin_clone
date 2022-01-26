import {
    AUTH_ERROR,
    LOGOUT,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED,
} from "./types";
import axios from "axios";
import { setAlert } from "./alert";
import { setTempNumber } from "./temp";
import setAuthToken from "../utils/setAuthToken";

//Load User
export const loadUser = () => async (dispatch) => {
    try {
        const res = await axios.get("/api/auth");

        dispatch({
            type: USER_LOADED,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
        });
    }
};

//Register
export const register =
    ({ number }) =>
    async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const body = JSON.stringify({ number });
        console.log(body);

        try {
            await axios.post("/api/auth", body, config);
            dispatch(setTempNumber({ number }));
        } catch (err) {
            const errors = err.response.data.errors;

            if (errors) {
                errors.forEach((error) =>
                    dispatch(setAlert(err.msg, "danger"))
                );
            }

            dispatch({
                type: REGISTER_FAIL,
            });
        }
    };

export const verifyOTP =
    ({ otp, number }) =>
    async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const body = JSON.stringify({ otp, number });

        try {
            const res = await axios.post("/api/auth/verifyOtp", body, config);

            setAuthToken(res.data.token);

            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data,
            });

            console.log("OTP VERIFIED");
        } catch (err) {
            const errors = err.response.data.errors;

            if (errors) {
                errors.forEach((error) =>
                    dispatch(setAlert(err.msg, "danger"))
                );
            }

            dispatch({
                type: REGISTER_FAIL,
            });
        }
    };

//Logout
export const logout = () => (dispatch) => {
    dispatch({
        type: LOGOUT,
    });
};
