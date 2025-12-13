import { actionTypes } from './action';

export const initialState = {
    maxvehaddcart: false,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_MAXVEHADDCART_SUCCESS:
            return {
                ...state,
                maxvehaddcart: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;