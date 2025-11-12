export const actionTypes = {
    GET_EDITENGINE: 'GET_EDITENGINE',
    GET_EDITENGINE_SUCCESS: 'GET_EDITENGINE_SUCCESS',
};

export function getEditEngine(payload) {
    //console.log("GET TYPES IDENTIFICATIONS : ", payload)
    return { type: actionTypes.GET_EDITENGINE, payload };
}

export function getEditEngineSuccess(payload) {
    return {
        type: actionTypes.GET_EDITENGINE_SUCCESS,
        payload,
    };
}