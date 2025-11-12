import { actionTypes } from './action';

export const initialState = {
    optionselect: 0,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_OPTIONSELECT_SUCCESS:
            return {
                ...state,
                optionselect: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;