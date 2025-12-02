import { actionTypes } from './action';

export const initialState = {
    activarviewprd: false,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_ACTIVARVIEWPRD_SUCCESS:
            return {
                ...state,
                activarviewprd: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;