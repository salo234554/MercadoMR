import { actionTypes } from './action';

export const initialState = {
    viewvehprd: 0,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_VIEWVEHPRD_SUCCESS:
            return {
                ...state,
                viewvehprd: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;