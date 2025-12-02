import { actionTypes } from './action';

export const initialState = {
    valfltrciudad: 0,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_VALFLTRCIUDAD_SUCCESS:
            return {
                ...state,
                valfltrciudad: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;