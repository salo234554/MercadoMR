import { actionTypes } from './action';

export const initialState = {
    ctlrvehselected: 1000,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_CTLRVEHSELECTED_SUCCESS:
            return {
                ...state,
                ctlrvehselected: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;