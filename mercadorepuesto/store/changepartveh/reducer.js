import { actionTypes } from './action';

export const initialState = {
    changepartveh: false,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_CHANGEPARTVEH_SUCCESS:
            return {
                ...state,
                changepartveh: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;