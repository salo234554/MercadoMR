export const actionTypes = {
    GET_OPTIONSELECT: 'GET_OPTIONSELECT',
    GET_OPTIONSELECT_SUCCESS: 'GET_OPTIONSELECT_SUCCESS',
};

export function getOptionSelect(payload) {
    return { type: actionTypes.GET_OPTIONSELECT, payload };
}

export function getOptionSelectSuccess(payload) {
    return {
        type: actionTypes.GET_OPTIONSELECT_SUCCESS,
        payload,
    };
}