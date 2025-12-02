import { actionTypes } from './action';

export const initialState = {
    resetdatasearch: false,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_RESETDATASEARCH_SUCCESS:
            return {
                ...state,
                resetdatasearch: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;