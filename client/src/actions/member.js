import axios from "axios";

import {
    DOSE_ADDED,
    DOSE_ADD_ERROR,
    MEMBERS_ADDED,
    MEMBERS_ADD_ERROR,
    MEMBERS_LOADED,
    MEMBERS_LOAD_ERROR,
} from "./types";

export const loadMembersData = () => async (dispatch) => {
    console.log("Loading Members");
    try {
        const res = await axios.get("/api/user/members");

        dispatch({
            type: MEMBERS_LOADED,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: MEMBERS_LOAD_ERROR,
        });
    }
};

export const addNewMember = (member) => async (dispatch) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const body = JSON.stringify(member);

        const res = await axios.post("/api/user/addMember", body, config);

        dispatch({
            type: MEMBERS_ADDED,
        });
    } catch (err) {
        dispatch({
            type: MEMBERS_ADD_ERROR,
        });
    }
};

export const addNewDose = (doseDetails, doseName) => async (dispatch) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const body = JSON.stringify(doseDetails);
        console.log(doseDetails);

        const res = await axios.post(`/api/user/${doseName}`, body, config);
        console.log(res.data);

        dispatch({
            type: DOSE_ADDED,
            payload: res.data.member,
        });
    } catch (err) {
        dispatch({
            type: DOSE_ADD_ERROR,
        });
    }
};
