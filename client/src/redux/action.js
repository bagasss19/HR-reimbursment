import { SETROLE } from "./constant"

export const setRole = (data) => {
    return { type: SETROLE, value: data }
}

export const getRole = (data) => {
    return (dispatch) => {
        setTimeout(() => {
            // Yay! Can invoke sync or async actions with `dispatch`
            dispatch(setRole(data));
        }, 1000);
    };
}


