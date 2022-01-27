import {
    DOSE_ADDED,
    DOSE_ADD_ERROR,
    MEMBERS_LOADED,
    MEMBERS_LOAD_ERROR,
    LOGOUT,
} from "../actions/types";

const initialState = [];

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case MEMBERS_LOADED:
            return payload.members;
        case MEMBERS_LOAD_ERROR:
            return [];
        case DOSE_ADDED:
            let ind = state.members.findIndex(
                (member) => member._id === payload._id
            );
            state.members[ind] = payload;
            return state;
        case DOSE_ADD_ERROR:
            return state;
        case LOGOUT:
            return [];
        default:
            return state;
    }
}
