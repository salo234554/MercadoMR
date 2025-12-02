import { actionTypes } from './action';

export const initialState = {
    updatedata: false,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_UPDATEDATA_SUCCESS:
            return {
                ...state,
                updatedata: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;