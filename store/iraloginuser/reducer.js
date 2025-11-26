import { actionTypes } from './action';

export const initialState = {
    iraloginuser: false,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_IRALOGINUSER_SUCCESS:
            return {
                ...state,
                iraloginuser: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;