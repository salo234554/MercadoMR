import { actionTypes } from './action';

export const initialState = {
    posicionhabitaculo: 0,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_POSICIONHABITACULO_SUCCESS:
            return {
                ...state,
                posicionhabitaculo: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;