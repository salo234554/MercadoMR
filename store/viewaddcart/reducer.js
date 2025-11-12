import { actionTypes } from './action';

export const initialState = {
    viewaddcart: 0,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_VIEWADDCART_SUCCESS:
            return {
                ...state,
                viewaddcart: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;