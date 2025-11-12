import { actionTypes } from './action';

export const initialState = {
    viewdatainteractive: false,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_VIEWDATAINTERACTIVE_SUCCESS:
            return {
                ...state,
                viewdatainteractive: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;