import { actionTypes } from './action';

export const initialState = {
    closeopenvehsearch: 0,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_CLOSEOPENVEHSEARCH_SUCCESS:
            return {
                ...state,
                closeopenvehsearch: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;