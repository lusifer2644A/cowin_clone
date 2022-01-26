import { TEMP_NUMBER } from "../actions/types";

const initialState = {
    number: null,
};

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case TEMP_NUMBER:
            console.log("payload", payload);
            return {
                number: payload,
            };
        default:
            return state;
    }
}
