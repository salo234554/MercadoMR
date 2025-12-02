import { actionTypes } from './action';

export const initialState = {
    filtersearch: 0,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_FILTERSEARCHINTERACTIVE_SUCCESS:
            return {
                ...state,
                filtersearch: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;