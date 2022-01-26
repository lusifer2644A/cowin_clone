import { TEMP_NUMBER } from "./types";

export const setTempNumber =
    ({ number }) =>
    (dispatch) => {
        dispatch({
            type: TEMP_NUMBER,
            payload: number,
        });
    };
